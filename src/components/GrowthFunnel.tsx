import { useMemo, useState } from "react";
import characterHero from "@/assets/character-hero.png";
import characterGuide from "@/assets/character-guide.png";

const AGENCY_NUMBER = "916000683808";

type StepId = 0 | 1 | 2 | 25 | 3 | 4 | 5 | 6;
type BusinessType = "product" | "service" | "both";

type Answers = {
  hasGMB: "yes" | "no" | "";
  websiteLinked: "yes" | "no" | "not sure" | "";
  businessType: BusinessType | "";
  extraServices: string[];
  selectedPlan: string;
  name: string;
  phone: string;
  preferredTime: string;
};

const EXTRA_SERVICES = ["SEO", "Google Ads", "Social Media Management", "Photography"];

const waLink = (message: string) =>
  `https://wa.me/${AGENCY_NUMBER}?text=${encodeURIComponent(message)}`;

/* ---------- shared presentational bits ---------- */

function Header() {
  return (
    <header className="flex items-center justify-center gap-2 pt-5 pb-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[0.7rem] font-extrabold text-primary-foreground">
        360°
      </span>
      <span className="text-sm font-bold tracking-tight text-foreground">
        360° Growth Partner
      </span>
    </header>
  );
}

function Progress({ current }: { current: number }) {
  const total = 6;
  const pct = Math.round((current / total) * 100);
  return (
    <div className="px-1 pb-6">
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-label="Progress through the questions"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${Math.max(pct, 6)}%` }}
        />
      </div>
      <div className="mt-2 flex justify-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total + 1 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i <= current ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Guide({ text }: { text: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <img
        src={characterGuide}
        alt="Your 360° Growth Partner guide"
        loading="lazy"
        width={816}
        height={816}
        className="h-14 w-14 shrink-0 rounded-full bg-accent object-cover"
      />
      <p className="rounded-2xl rounded-bl-sm bg-card px-4 py-2.5 text-sm text-muted-foreground shadow-soft">
        {text}
      </p>
    </div>
  );
}

function StepShell({
  stepKey,
  children,
}: {
  stepKey: string;
  children: React.ReactNode;
}) {
  return (
    <div key={stepKey} className="animate-step-in">
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-soft transition-all hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] disabled:opacity-60"
    >
      {children}
    </button>
  );
}

function ChoiceButton({
  children,
  onClick,
  hint,
}: {
  children: React.ReactNode;
  onClick: () => void;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-left text-base font-semibold text-card-foreground shadow-soft transition-all hover:border-primary hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99]"
    >
      {children}
      {hint ? (
        <span className="mt-1 block text-sm font-normal text-muted-foreground">{hint}</span>
      ) : null}
    </button>
  );
}

function WhatsAppPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-3 py-1.5 text-xs font-bold text-whatsapp-foreground">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-6.5-5.7c-.4-.8-.4-1.5-.2-2 .2-.4.7-1 1-1.1.3-.1.7 0 .9.4l.7 1.4c.1.3 0 .5-.1.7l-.4.5c-.1.2-.2.4 0 .7a8 8 0 0 0 3.2 2.8c.3.1.5.1.7-.1l.6-.6c.2-.2.4-.2.7-.1l1.4.7c.4.2.5.5.4.9Z" />
      </svg>
      {label}
    </span>
  );
}

function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="m-0 w-full">
      <div className="rounded-[1.6rem] border border-border bg-card p-2 shadow-soft">
        <div className="rounded-[1.2rem] bg-background p-3">{children}</div>
      </div>
      <figcaption className="mt-2 text-center text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  );
}

function GoogleRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary/60 px-2 py-1.5 text-[0.65rem] text-secondary-foreground">
      {children}
    </div>
  );
}

/* ---------- offer content ---------- */

const OFFERS: Record<
  BusinessType,
  { headline: string; plan: string; bullets: string[]; upsell: string }
> = {
  service: {
    headline: "A Simple Page That Turns Visitors Into Calls",
    plan: "₹99/month — Simple Landing Page",
    bullets: [
      "List your services clearly",
      "One-click WhatsApp Connect button",
      "Looks professional on mobile",
      "Live within 24 hours",
    ],
    upsell: "Need multiple pages or want to rank higher on Google? Custom Website — ₹4,999",
  },
  product: {
    headline: "A Digital Catalog Your Customers Can Browse and Order From",
    plan: "₹99/month — Digital Catalog Page",
    bullets: [
      "Showcase your products with photos",
      "Direct-to-WhatsApp ordering button on every product",
      "No app needed — customers just tap and chat",
      "Live within 24 hours",
    ],
    upsell: "Want more products, categories, or a full multi-page site? Custom Website — ₹4,999",
  },
  both: {
    headline: "One Page, Everything You Offer",
    plan: "₹99/month — Combined Landing Page",
    bullets: [
      "Show products AND services in one page",
      "WhatsApp Connect on every section",
      "Clean, simple, professional",
      "Live within 24 hours",
    ],
    upsell: "Want a bigger site with separate pages for each? Custom Website — ₹4,999",
  },
};

const SAMPLE_SERVICES = ["Home Repairs", "Installation", "Annual Service", "Emergency Visit"];
const SAMPLE_PRODUCTS = ["Cotton Kurta", "Silk Saree", "Dupatta Set", "Kids Wear"];

function ServicePreview() {
  return (
    <PhoneFrame label="Your page on mobile">
      <p className="text-sm font-bold text-foreground">Sharma Home Services</p>
      <p className="text-[0.7rem] text-muted-foreground">Open now · Nearby in your city</p>
      <ul className="mt-3 space-y-1.5">
        {SAMPLE_SERVICES.map((s) => (
          <li
            key={s}
            className="flex items-center gap-2 rounded-lg bg-muted px-2 py-1.5 text-[0.72rem] font-medium text-foreground"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-google-blue/15 text-[0.6rem] font-bold text-google-blue">
              ✓
            </span>
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex animate-soft-pulse items-center justify-center rounded-xl bg-whatsapp py-2.5 text-xs font-bold text-whatsapp-foreground">
        Chat on WhatsApp
      </div>
    </PhoneFrame>
  );
}

function ProductPreview() {
  return (
    <PhoneFrame label="Your catalog on mobile">
      <p className="text-sm font-bold text-foreground">Verma Cloth House</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {SAMPLE_PRODUCTS.map((p, i) => (
          <div key={p} className="overflow-hidden rounded-xl border border-border bg-card">
            <div
              className={`h-14 ${i % 2 === 0 ? "bg-accent" : "bg-secondary"}`}
              aria-hidden="true"
            />
            <div className="p-1.5">
              <p className="truncate text-[0.65rem] font-semibold text-card-foreground">{p}</p>
              <a
                href={waLink(`Hi, I'm interested in ${p}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block rounded-md bg-whatsapp py-1 text-center text-[0.58rem] font-bold text-whatsapp-foreground"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[0.68rem] leading-relaxed text-muted-foreground">
        Tapping a product opens WhatsApp with a message already written — “Hi, I'm interested in
        Cotton Kurta” — so the enquiry lands straight in your WhatsApp.
      </p>
    </PhoneFrame>
  );
}

function BothPreview() {
  return (
    <PhoneFrame label="Products + services in one page">
      <p className="text-sm font-bold text-foreground">Gupta Store & Services</p>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {SAMPLE_PRODUCTS.slice(0, 3).map((p, i) => (
          <div key={p} className="overflow-hidden rounded-lg border border-border">
            <div className={`h-9 ${i % 2 === 0 ? "bg-accent" : "bg-secondary"}`} aria-hidden="true" />
            <p className="truncate px-1 py-0.5 text-[0.55rem] font-semibold text-foreground">{p}</p>
          </div>
        ))}
      </div>
      <ul className="mt-2 space-y-1">
        {SAMPLE_SERVICES.slice(0, 2).map((s) => (
          <li key={s} className="rounded-lg bg-muted px-2 py-1 text-[0.68rem] font-medium">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex animate-soft-pulse items-center justify-center rounded-xl bg-whatsapp py-2.5 text-xs font-bold text-whatsapp-foreground">
        Chat on WhatsApp
      </div>
    </PhoneFrame>
  );
}

/* ---------- main funnel ---------- */

export default function GrowthFunnel() {
  const [step, setStep] = useState<StepId>(0);
  const [answers, setAnswers] = useState<Answers>({
    hasGMB: "",
    websiteLinked: "",
    businessType: "",
    extraServices: [],
    selectedPlan: "",
    name: "",
    phone: "",
    preferredTime: "Morning",
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const progressIndex = useMemo(() => {
    const map: Record<StepId, number> = { 0: 0, 1: 1, 2: 2, 25: 3, 3: 3, 4: 4, 5: 5, 6: 6 };
    return map[step];
  }, [step]);

  const update = (patch: Partial<Answers>) => setAnswers((a) => ({ ...a, ...patch }));

  const toggleService = (service: string) =>
    setAnswers((a) => ({
      ...a,
      extraServices: a.extraServices.includes(service)
        ? a.extraServices.filter((s) => s !== service)
        : [...a.extraServices, service],
    }));

  const leadMessage = (a: Answers) =>
    [
      "New booking request — 360° Growth Partner",
      `Name: ${a.name}`,
      `Phone: ${a.phone}`,
      `Preferred time: ${a.preferredTime}`,
      `Google Business Profile: ${a.hasGMB || "not asked"}`,
      `Website linked: ${a.websiteLinked || "not asked"}`,
      `Business type: ${a.businessType || "not asked"}`,
      `Interested in: ${a.selectedPlan || "—"}`,
    ].join("\n");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; phone?: string } = {};
    if (!answers.name.trim()) nextErrors.name = "Please enter your name.";
    const digits = answers.phone.replace(/\D/g, "").replace(/^91/, "");
    if (!/^[6-9]\d{9}$/.test(digits))
      nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = { ...answers, phone: digits };
    window.open(waLink(leadMessage(payload)), "_blank", "noopener,noreferrer");
    setStep(6);
  };

  const selectPlan = (plan: string) => {
    update({ selectedPlan: plan });
    setStep(5);
  };

  const offer = answers.businessType ? OFFERS[answers.businessType as BusinessType] : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-md px-5 pb-14">
        <Header />
        {step > 0 && step < 6 ? <Progress current={progressIndex} /> : null}

        {step === 0 && (
          <StepShell stepKey="s0">
            <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tight text-foreground">
              A Website for Your Business — Just ₹99.
            </h1>
            <p className="mt-3 text-center text-base leading-relaxed text-muted-foreground">
              So people can see what you offer and contact you on WhatsApp or call, instantly.
            </p>

            <div className="mt-6 rounded-3xl bg-card p-4 shadow-soft">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <PhoneFrame label="Before">
                  <p className="text-[0.7rem] font-bold text-foreground">Sharma Traders</p>
                  <div className="mt-2 space-y-1.5">
                    <GoogleRow>No services listed</GoogleRow>
                    <GoogleRow>No website</GoogleRow>
                    <GoogleRow>No WhatsApp</GoogleRow>
                  </div>
                </PhoneFrame>
                <span aria-hidden="true" className="text-xl text-primary">
                  →
                </span>
                <PhoneFrame label="After">
                  <p className="text-[0.7rem] font-bold text-foreground">Sharma Traders</p>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex gap-1">
                      <span className="h-6 flex-1 rounded bg-accent" aria-hidden="true" />
                      <span className="h-6 flex-1 rounded bg-secondary" aria-hidden="true" />
                    </div>
                    <GoogleRow>
                      <span className="font-bold text-google-blue">Website</span> linked
                    </GoogleRow>
                    <GoogleRow>4 services listed</GoogleRow>
                    <div className="flex animate-soft-pulse items-center justify-center rounded-md bg-whatsapp py-1 text-[0.6rem] font-bold text-whatsapp-foreground">
                      WhatsApp
                    </div>
                  </div>
                </PhoneFrame>
              </div>

              <img
                src={characterHero}
                alt="Friendly 360° Growth Partner guide welcoming you"
                width={896}
                height={1152}
                className="mx-auto mt-4 h-56 w-auto object-contain"
              />
            </div>

            <p className="mt-4 text-center text-sm font-medium text-muted-foreground">
              Trusted by 100+ businesses already.
            </p>
            <div className="mt-4">
              <PrimaryButton onClick={() => setStep(1)}>Get My ₹99 Website</PrimaryButton>
            </div>
          </StepShell>
        )}

        {step === 1 && (
          <StepShell stepKey="s1">
            <Guide text="Quick question first — it takes 10 seconds." />
            <h2 className="text-xl font-bold leading-snug text-foreground">
              Do you have a Google Business Profile (the listing that shows on Google Maps/Search)?
            </h2>
            <div className="mt-5 space-y-3">
              <ChoiceButton
                onClick={() => {
                  update({ hasGMB: "yes" });
                  setStep(2);
                }}
              >
                Yes
              </ChoiceButton>
              <ChoiceButton
                onClick={() => {
                  update({ hasGMB: "no", websiteLinked: "" });
                  setStep(3);
                }}
              >
                No
              </ChoiceButton>
            </div>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell stepKey="s2">
            <Guide text="Great! Let's check how it's set up." />
            <h2 className="text-xl font-bold leading-snug text-foreground">
              Is your website properly linked on your GMB listing?
            </h2>
            <div className="mt-5 space-y-3">
              <ChoiceButton
                onClick={() => {
                  update({ websiteLinked: "yes" });
                  setStep(25);
                }}
              >
                Yes, it's linked and working
              </ChoiceButton>
              <ChoiceButton
                onClick={() => {
                  update({ websiteLinked: "not sure" });
                  setStep(3);
                }}
              >
                No / Not sure / Needs improvement
              </ChoiceButton>
            </div>
          </StepShell>
        )}

        {step === 25 && (
          <StepShell stepKey="s25">
            <Guide text="Nicely done — you're ahead of most local businesses." />
            <h2 className="text-xl font-bold leading-snug text-foreground">
              Nice! What else are you looking for?
            </h2>
            <fieldset className="mt-5 space-y-3 border-0 p-0">
              <legend className="sr-only">Additional services</legend>
              {EXTRA_SERVICES.map((service) => {
                const checked = answers.extraServices.includes(service);
                return (
                  <label
                    key={service}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border bg-card px-5 py-4 text-base font-semibold shadow-soft transition-colors ${
                      checked ? "border-primary" : "border-border"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(service)}
                      className="h-5 w-5 accent-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <span className="text-card-foreground">{service}</span>
                  </label>
                );
              })}
            </fieldset>
            <p className="mt-3 text-sm text-muted-foreground">
              Also ask us about custom digital marketing services.
            </p>
            <div className="mt-5">
              <PrimaryButton
                onClick={() =>
                  selectPlan(
                    `Additional services: ${
                      answers.extraServices.length ? answers.extraServices.join(", ") : "to discuss"
                    }`,
                  )
                }
              >
                Talk to Our Team
              </PrimaryButton>
            </div>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell stepKey="s3">
            <Guide text="Last bit — so we build the right page for you." />
            <h2 className="text-xl font-bold leading-snug text-foreground">
              Tell us about your business
            </h2>
            <div className="mt-5 space-y-3">
              <ChoiceButton
                onClick={() => {
                  update({ businessType: "product" });
                  setStep(4);
                }}
              >
                I sell products
              </ChoiceButton>
              <ChoiceButton
                onClick={() => {
                  update({ businessType: "service" });
                  setStep(4);
                }}
              >
                I offer a service
              </ChoiceButton>
              <ChoiceButton
                onClick={() => {
                  update({ businessType: "both" });
                  setStep(4);
                }}
              >
                Both
              </ChoiceButton>
            </div>
          </StepShell>
        )}

        {step === 4 && offer && (
          <StepShell stepKey={`s4-${answers.businessType}`}>
            <Guide text="Here's what we'll build for you." />
            <h2 className="text-2xl font-extrabold leading-tight text-foreground">
              {offer.headline}
            </h2>

            <div className="mt-5">
              {answers.businessType === "service" && <ServicePreview />}
              {answers.businessType === "product" && <ProductPreview />}
              {answers.businessType === "both" && <BothPreview />}
            </div>

            <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-soft">
              <p className="text-lg font-extrabold text-card-foreground">{offer.plan}</p>
              <ul className="mt-3 space-y-2">
                {offer.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                    <span aria-hidden="true" className="font-bold text-primary">
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-2xl bg-muted px-4 py-3 text-sm font-medium text-foreground">
                We build it first. You only pay once you're happy with it — no upfront payment.
              </p>
              <div className="mt-4">
                <PrimaryButton onClick={() => selectPlan(`₹99 — ${offer.plan}`)}>
                  Choose ₹99 Plan
                </PrimaryButton>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <WhatsAppPill label="Every enquiry lands on WhatsApp" />
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-dashed border-border bg-secondary/50 p-5">
              <p className="text-sm text-secondary-foreground">{offer.upsell}</p>
              <button
                type="button"
                onClick={() => selectPlan("₹4,999 — Custom Website")}
                className="mt-3 w-full rounded-2xl border border-primary bg-card px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Select this instead
              </button>
            </div>
          </StepShell>
        )}

        {step === 5 && (
          <StepShell stepKey="s5">
            <Guide text="Almost there — just your details." />
            <h2 className="text-2xl font-extrabold leading-tight text-foreground">
              Let's Get This Live For You
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Our team will call you to confirm the details — remember, you only pay once you've seen
              it and you're happy with it.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={answers.name}
                  onChange={(e) => update({ name: e.target.value })}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="mt-1.5 w-full rounded-2xl border border-input bg-card px-4 py-3.5 text-base text-card-foreground shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1 text-sm text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  autoComplete="tel"
                  maxLength={14}
                  placeholder="10-digit mobile number"
                  value={answers.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className="mt-1.5 w-full rounded-2xl border border-input bg-card px-4 py-3.5 text-base text-card-foreground shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                {errors.phone && (
                  <p id="phone-error" role="alert" className="mt-1 text-sm text-destructive">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-semibold text-foreground">
                  Preferred time to connect
                </label>
                <select
                  id="time"
                  name="preferredTime"
                  value={answers.preferredTime}
                  onChange={(e) => update({ preferredTime: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-input bg-card px-4 py-3.5 text-base text-card-foreground shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>

              <PrimaryButton type="submit">Book My Free Call</PrimaryButton>
            </form>
          </StepShell>
        )}

        {step === 6 && (
          <StepShell stepKey="s6">
            <div className="rounded-3xl bg-card p-6 text-center shadow-soft">
              <img
                src={characterGuide}
                alt="Your guide giving a thumbs up"
                loading="lazy"
                width={816}
                height={816}
                className="mx-auto h-24 w-24 rounded-full bg-accent object-cover"
              />
              <h2 className="mt-4 text-2xl font-extrabold text-card-foreground">
                You're All Set! 🎉
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Our team will reach out during your preferred time. Want to chat right now instead?
              </p>
              <a
                href={waLink(leadMessage(answers))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp px-6 py-4 text-base font-bold text-whatsapp-foreground shadow-soft transition-all hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Message Us on WhatsApp
              </a>
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              360° Growth Partner — Trusted by 100+ businesses
            </p>
          </StepShell>
        )}

        {step > 0 && step < 6 && (
          <button
            type="button"
            onClick={() =>
              setStep((s) =>
                s === 5 ? (answers.businessType ? 4 : 25) : s === 4 ? 3 : s === 25 ? 2 : s === 3 ? (answers.hasGMB === "yes" ? 2 : 1) : s === 2 ? 1 : 0,
              )
            }
            className="mx-auto mt-8 block rounded-full px-4 py-2 text-sm font-medium text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
