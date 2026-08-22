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
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-terracotta to-saffron text-[0.7rem] font-extrabold text-terracotta-foreground shadow-glow-terracotta">
        360°
      </span>
      <span className="truncate text-sm font-extrabold tracking-tight text-foreground sm:text-base">
        360° Growth Partner
      </span>
    </header>
  );
}

function Progress({ current }: { current: number }) {
  const total = 6;
  const pct = Math.round((current / total) * 100);
  return (
    <div className="pb-6">
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-label="Progress through the questions"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal via-primary to-terracotta transition-all duration-500 ease-out"
          style={{ width: `${Math.max(pct, 8)}%` }}
        />
      </div>
      <div className="mt-2 flex justify-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total + 1 }).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i <= current ? "bg-terracotta" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Guide({ text }: { text: string }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <img
        src={characterGuide}
        alt="Your 360° Growth Partner guide"
        loading="lazy"
        width={816}
        height={816}
        className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-accent to-saffron/60 object-cover ring-2 ring-terracotta/30 sm:h-14 sm:w-14"
      />
      <p className="min-w-0 rounded-2xl rounded-bl-sm border border-terracotta/15 bg-card px-4 py-2.5 text-sm text-muted-foreground shadow-soft">
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
      className="min-h-[3.25rem] w-full rounded-2xl bg-gradient-to-r from-terracotta to-saffron px-5 py-4 text-base font-extrabold text-terracotta-foreground shadow-glow-terracotta transition-all hover:brightness-105 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:opacity-60 sm:text-lg"
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
      className="min-h-[3.25rem] w-full rounded-2xl border-2 border-border bg-card px-4 py-4 text-left text-base font-bold text-card-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:border-teal hover:bg-teal/5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] sm:px-5"
    >
      {children}
      {hint ? (
        <span className="mt-1 block text-sm font-normal text-muted-foreground">{hint}</span>
      ) : null}
    </button>
  );
}

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-current`}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-6.5-5.7c-.4-.8-.4-1.5-.2-2 .2-.4.7-1 1-1.1.3-.1.7 0 .9.4l.7 1.4c.1.3 0 .5-.1.7l-.4.5c-.1.2-.2.4 0 .7a8 8 0 0 0 3.2 2.8c.3.1.5.1.7-.1l.6-.6c.2-.2.4-.2.7-.1l1.4.7c.4.2.5.5.4.9Z" />
    </svg>
  );
}

function WhatsAppPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-3 py-1.5 text-center text-xs font-bold text-whatsapp-foreground shadow-glow-whatsapp">
      <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
      {label}
    </span>
  );
}

function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="m-0 w-full min-w-0">
      <div className="rounded-[1.4rem] border-2 border-border bg-card p-1.5 shadow-soft sm:p-2">
        <div className="rounded-[1rem] bg-background p-2 sm:p-3">{children}</div>
      </div>
      <figcaption className="mt-2 text-center text-[0.65rem] font-extrabold uppercase tracking-wide text-terracotta sm:text-[0.7rem]">
        {label}
      </figcaption>
    </figure>
  );
}

function GoogleRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary/70 px-2 py-1.5 text-[0.62rem] leading-tight text-secondary-foreground sm:text-[0.65rem]">
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
      <div className="mt-3 flex animate-soft-pulse items-center justify-center rounded-xl bg-whatsapp py-3 text-xs font-extrabold text-whatsapp-foreground shadow-glow-whatsapp">
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
              className={`h-14 ${i % 2 === 0 ? "bg-gradient-to-br from-saffron to-terracotta/70" : "bg-gradient-to-br from-teal/70 to-primary"}`}
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
            <div className={`h-9 ${i % 2 === 0 ? "bg-gradient-to-br from-saffron to-terracotta/70" : "bg-gradient-to-br from-teal/70 to-primary"}`} aria-hidden="true" />
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
      <div className="mt-3 flex animate-soft-pulse items-center justify-center rounded-xl bg-whatsapp py-3 text-xs font-extrabold text-whatsapp-foreground shadow-glow-whatsapp">
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
    <div className="min-h-screen w-full overflow-x-hidden bg-page-gradient">
      <div className="mx-auto w-full max-w-md px-4 pb-16 sm:max-w-lg sm:px-6 lg:max-w-xl">
        <Header />
        {step > 0 && step < 6 ? <Progress current={progressIndex} /> : null}

        {step === 0 && (
          <StepShell stepKey="s0">
            <h1 className="text-balance text-center text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              A Website for Your Business —{" "}
              <span className="bg-gradient-to-r from-terracotta to-primary bg-clip-text text-transparent">
                Just ₹99.
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-prose text-center text-[0.95rem] leading-relaxed text-muted-foreground sm:text-lg">
              So people can see what you offer and contact you on WhatsApp or call, instantly.
            </p>

            <div className="mt-6 rounded-3xl border border-terracotta/15 bg-card/90 p-3 shadow-soft sm:p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5 sm:gap-3">
                <PhoneFrame label="Before">
                  <p className="truncate text-[0.68rem] font-bold text-foreground sm:text-sm">
                    Sharma Traders
                  </p>
                  <div className="mt-2 space-y-1.5">
                    <GoogleRow>No services listed</GoogleRow>
                    <GoogleRow>No website</GoogleRow>
                    <GoogleRow>No WhatsApp</GoogleRow>
                  </div>
                </PhoneFrame>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-terracotta to-saffron text-sm font-bold text-terracotta-foreground shadow-glow-terracotta sm:h-9 sm:w-9 sm:text-base"
                >
                  →
                </span>
                <PhoneFrame label="After">
                  <p className="truncate text-[0.68rem] font-bold text-foreground sm:text-sm">
                    Sharma Traders
                  </p>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex gap-1">
                      <span
                        className="h-6 flex-1 rounded bg-gradient-to-br from-saffron to-terracotta/70"
                        aria-hidden="true"
                      />
                      <span
                        className="h-6 flex-1 rounded bg-gradient-to-br from-teal/70 to-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <GoogleRow>
                      <span className="font-bold text-google-blue">Website</span> linked
                    </GoogleRow>
                    <GoogleRow>4 services listed</GoogleRow>
                    <div className="flex animate-soft-pulse items-center justify-center rounded-md bg-whatsapp py-1 text-[0.58rem] font-bold text-whatsapp-foreground sm:text-[0.65rem]">
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
                className="mx-auto mt-4 h-auto w-full max-w-[220px] object-contain sm:max-w-[260px]"
              />
            </div>

            <p className="mt-4 text-center text-sm font-semibold text-terracotta">
              Trusted by 100+ businesses already.
            </p>
            <div className="mt-5">
              <PrimaryButton onClick={() => setStep(1)}>Get My ₹99 Website</PrimaryButton>
            </div>
            <a
              href={waLink("Hi! I want the ₹99 website for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp px-5 py-4 text-base font-extrabold text-whatsapp-foreground shadow-glow-whatsapp transition-all hover:brightness-105 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </StepShell>
        )}

        {step === 1 && (
          <StepShell stepKey="s1">
            <Guide text="Quick question first — it takes 10 seconds." />
            <h2 className="text-balance text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
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
            <h2 className="text-balance text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
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
            <h2 className="text-balance text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
              Nice! What else are you looking for?
            </h2>
            <fieldset className="mt-5 space-y-3 border-0 p-0">
              <legend className="sr-only">Additional services</legend>
              {EXTRA_SERVICES.map((service) => {
                const checked = answers.extraServices.includes(service);
                return (
                  <label
                    key={service}
                    className={`flex min-h-[3.25rem] cursor-pointer items-center gap-3 rounded-2xl border-2 bg-card px-4 py-4 text-base font-bold shadow-soft transition-all hover:shadow-lift sm:px-5 ${
                      checked ? "border-teal bg-teal/5" : "border-border"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(service)}
                      className="h-5 w-5 shrink-0 accent-[var(--color-teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            <h2 className="text-balance text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
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
            <h2 className="text-balance text-[1.5rem] font-extrabold leading-tight text-foreground sm:text-3xl">
              {offer.headline}
            </h2>

            <div className="mt-5">
              {answers.businessType === "service" && <ServicePreview />}
              {answers.businessType === "product" && <ProductPreview />}
              {answers.businessType === "both" && <BothPreview />}
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border-2 border-terracotta/40 bg-card shadow-lift">
              <div className="bg-gradient-to-r from-terracotta to-saffron px-4 py-3 sm:px-5">
                <p className="text-base font-extrabold text-terracotta-foreground sm:text-lg">
                  {offer.plan}
                </p>
              </div>
              <div className="p-4 sm:p-5">
              <ul className="mt-3 space-y-2">
                {offer.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                    <span aria-hidden="true" className="shrink-0 font-bold text-teal">
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-2xl border border-teal/25 bg-teal/10 px-4 py-3 text-sm font-medium text-foreground">
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
            </div>

            <div className="mt-5 rounded-3xl border-2 border-dashed border-teal/50 bg-teal/5 p-4 sm:p-5">
              <p className="text-sm text-secondary-foreground">{offer.upsell}</p>
              <button
                type="button"
                onClick={() => selectPlan("₹4,999 — Custom Website")}
                className="mt-3 min-h-[3rem] w-full rounded-2xl border-2 border-teal bg-card px-5 py-3 text-sm font-bold text-teal shadow-soft transition-all hover:-translate-y-0.5 hover:bg-teal hover:text-teal-foreground hover:shadow-lift active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Select this instead
              </button>
            </div>
          </StepShell>
        )}

        {step === 5 && (
          <StepShell stepKey="s5">
            <Guide text="Almost there — just your details." />
            <h2 className="text-balance text-[1.5rem] font-extrabold leading-tight text-foreground sm:text-3xl">
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
                  className="mt-1.5 min-h-[3.25rem] w-full rounded-2xl border-2 border-input bg-card px-4 py-3.5 text-base text-card-foreground shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
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
                  className="mt-1.5 min-h-[3.25rem] w-full rounded-2xl border-2 border-input bg-card px-4 py-3.5 text-base text-card-foreground shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
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
                  className="mt-1.5 min-h-[3.25rem] w-full rounded-2xl border-2 border-input bg-card px-4 py-3.5 text-base text-card-foreground shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            <div className="rounded-3xl border-2 border-terracotta/25 bg-card p-5 text-center shadow-lift sm:p-6">
              <img
                src={characterGuide}
                alt="Your guide giving a thumbs up"
                loading="lazy"
                width={816}
                height={816}
                className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-accent to-saffron/60 object-cover ring-4 ring-terracotta/25"
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
                className="mt-5 flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp px-5 py-4 text-base font-extrabold text-whatsapp-foreground shadow-glow-whatsapp transition-all hover:brightness-105 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 active:scale-[0.98]"
              >
                <WhatsAppIcon />
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
            className="mx-auto mt-8 block min-h-[2.75rem] rounded-full px-5 py-2 text-sm font-semibold text-terracotta underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
