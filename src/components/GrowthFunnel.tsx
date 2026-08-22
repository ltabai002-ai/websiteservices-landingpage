import { useMemo, useState } from "react";
import characterHero from "@/assets/character-hero.png";
import characterGuide from "@/assets/character-guide.png";
import ltabLogo from "@/assets/ltab-logo.png";

const AGENCY_NUMBER = "916000683808";

type StepId = 0 | 1 | 2 | 25 | 3 | 4 | 45 | 5 | 6;
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

const EXTRA_SERVICES = [
  "Google Ads (to get more audience)",
  "Digital Marketing (for branding)",
  "Photography",
  "Business Automation (to ease the work)",
];

const waLink = (message: string) =>
  `https://wa.me/${AGENCY_NUMBER}?text=${encodeURIComponent(message)}`;

/* ---------- shared presentational bits ---------- */

function Header() {
  return (
    <header className="flex items-center justify-center gap-2 pt-5 pb-3">
      <img
        src={ltabLogo}
        alt="LTAB logo icon"
        className="h-9 w-9 shrink-0 object-contain rounded-full"
      />
      <span className="truncate text-sm font-extrabold tracking-tight text-foreground sm:text-base">
        Ltab your 360° digital partner.
      </span>
    </header>
  );
}

function Progress({ current }: { current: number }) {
  const total = 7;
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
  variant = "default",
}: {
  children: React.ReactNode;
  onClick: () => void;
  hint?: string;
  variant?: "default" | "green" | "red";
}) {
  const variantClasses = {
    default: "border-border bg-card hover:border-teal hover:bg-teal/5 text-card-foreground focus-visible:ring-teal",
    green: "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500",
    red: "border-destructive bg-destructive text-white hover:bg-red-600/90 focus-visible:ring-red-500",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[3.25rem] w-full rounded-2xl border-2 px-4 py-4 text-left text-base font-extrabold shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] sm:px-5 ${variantClasses[variant]}`}
    >
      {children}
      {hint ? (
        <span className={`mt-1 block text-sm font-normal ${variant === "default" ? "text-muted-foreground" : "text-white/85"}`}>{hint}</span>
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

function BrowserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className={className} aria-hidden="true">
      <rect x={2} y={3} width={20} height={18} rx={2} />
      <path strokeLinecap="round" d="M2 8h20M5 5.5h.01M8 5.5h.01M11 5.5h.01" />
    </svg>
  );
}

function GridIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
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


function GoogleDashboardMockup({ hasErrors = true }: { hasErrors?: boolean }) {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-border bg-slate-50 p-2.5 shadow-sm">
      {/* Simulated Google Search Bar */}
      <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-sm border border-slate-100 mb-3">
        <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Google
        </span>
        <div className="h-4 w-[1px] bg-border" />
        <span className="text-xs font-semibold text-foreground flex-1 truncate">Sharma Traders</span>
        <svg className="h-4 w-4 text-google-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Real Google Business Profile Dashboard Widget */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-google-blue text-white font-extrabold text-[0.6rem] shadow-sm">
              G
            </span>
            <div>
              <h4 className="text-[0.7rem] font-extrabold text-foreground leading-tight">Your business on Google</h4>
              <p className="text-[0.58rem] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                <svg className="h-3 w-3 inline text-google-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Only visible to you
              </p>
            </div>
          </div>
          <span className="text-[0.58rem] font-bold text-google-blue bg-google-blue/10 px-2 py-0.5 rounded-full">
            Verified
          </span>
        </div>

        {/* Dashboard Action Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Edit Profile */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-700">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span className="mt-1 text-[0.62rem] font-medium text-slate-600">Edit profile</span>
          </div>

          {/* Add Website */}
          <div className="flex flex-col items-center text-center relative">
            {hasErrors ? (
              <>
                <span className="absolute top-0 right-3.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[0.5rem] font-black text-white ring-1.5 ring-white animate-soft-pulse">
                  !
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 border border-destructive/30 text-destructive">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="mt-1 text-[0.62rem] font-bold text-destructive">Add website</span>
              </>
            ) : (
              <>
                <span className="absolute top-0 right-3.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-teal text-[0.5rem] font-black text-white ring-1.5 ring-white">
                  ✓
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 border border-teal/30 text-teal">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="mt-1 text-[0.62rem] font-bold text-teal">Website linked</span>
              </>
            )}
          </div>

          {/* Edit Services */}
          <div className="flex flex-col items-center text-center relative">
            {hasErrors ? (
              <>
                <span className="absolute top-0 right-3.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[0.5rem] font-black text-white ring-1.5 ring-white animate-soft-pulse">
                  !
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 border border-destructive/30 text-destructive">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="mt-1 text-[0.62rem] font-bold text-destructive">Edit services</span>
              </>
            ) : (
              <>
                <span className="absolute top-0 right-3.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-teal text-[0.5rem] font-black text-white ring-1.5 ring-white">
                  ✓
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 border border-teal/30 text-teal">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="mt-1 text-[0.62rem] font-bold text-teal">Services list</span>
              </>
            )}
          </div>

          {/* WhatsApp Connection */}
          <div className="flex flex-col items-center text-center relative">
            {hasErrors ? (
              <>
                <span className="absolute top-0 right-3.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[0.5rem] font-black text-white ring-1.5 ring-white animate-soft-pulse">
                  !
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 border border-destructive/30 text-destructive">
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                </div>
                <span className="mt-1 text-[0.62rem] font-bold text-destructive leading-tight">WhatsApp link</span>
              </>
            ) : (
              <>
                <span className="absolute top-0 right-3.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-teal text-[0.5rem] font-black text-white ring-1.5 ring-white">
                  ✓
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 border border-teal/30 text-teal">
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                </div>
                <span className="mt-1 text-[0.62rem] font-bold text-teal leading-tight">WhatsApp active</span>
              </>
            )}
          </div>

          {/* Read Reviews */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-700">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.365 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.518-4.674z" />
              </svg>
            </div>
            <span className="mt-1 text-[0.62rem] font-medium text-slate-600">Read reviews</span>
          </div>

          {/* Add Photo */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-700">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="mt-1 text-[0.62rem] font-medium text-slate-600">Add photo</span>
          </div>
        </div>

        {/* Dashboard Critical Alert Bar */}
        {hasErrors ? (
          <div className="mt-3.5 p-2.5 rounded-lg bg-destructive/5 border border-destructive/15 text-left flex items-start gap-1.5">
            <span className="text-destructive text-xs leading-none mt-0.5">⚠️</span>
            <div className="text-[0.6rem] text-destructive leading-normal font-bold">
              Customer contact flow is broken. 3 action items need immediate setup.
            </div>
          </div>
        ) : (
          <div className="mt-3.5 p-2.5 rounded-lg bg-teal/5 border border-teal/15 text-left flex items-start gap-1.5">
            <span className="text-teal text-xs leading-none mt-0.5">✅</span>
            <div className="text-[0.6rem] text-teal leading-normal font-bold">
              Customer contact flow active. All channels fully optimized.
            </div>
          </div>
        )}
      </div>
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

  const progressTotal = useMemo(() => {
    return answers.websiteLinked === "yes" ? 5 : 7;
  }, [answers.websiteLinked]);

  const progressIndex = useMemo(() => {
    if (step === 0) return 0;
    if (step === 1) return 1;
    if (step === 2) return 2;

    const hasWebsiteQuery = answers.websiteLinked === "yes";

    if (hasWebsiteQuery) {
      const map: Record<StepId, number> = { 0: 0, 1: 1, 2: 2, 25: 3, 3: 3, 4: 4, 45: 4, 5: 5, 6: 6 };
      return map[step];
    } else {
      const map: Record<StepId, number> = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 25: 5, 45: 6, 5: 7, 6: 8 };
      return map[step];
    }
  }, [step, answers.websiteLinked]);

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
    setStep(25); // Go to extra services next
  };

  const offer = answers.businessType ? OFFERS[answers.businessType as BusinessType] : null;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-page-gradient">
      <div className="mx-auto w-full max-w-md px-4 pb-16 sm:max-w-lg sm:px-6 lg:max-w-xl">
        <Header />
        {step > 0 && step < 6 ? <Progress current={progressIndex} total={progressTotal} /> : null}

        {step === 0 && (
          <StepShell stepKey="s0">
            <div className="flex justify-center my-6">
              <h1 className="relative overflow-hidden inline-block rounded-3xl border-4 border-white bg-gradient-to-br from-terracotta via-primary to-teal p-5 text-center shadow-lift">
                {/* SVG Background Isometric Illustration */}
                <svg
                  viewBox="0 0 400 200"
                  className="absolute right-0 bottom-0 h-full w-auto opacity-15 sm:opacity-25 pointer-events-none select-none z-0"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <g transform="translate(180, 25)">
                    {/* Isometric Base Grid */}
                    <path d="M 0 80 L 100 30 L 200 80 L 100 130 Z" fill="rgba(255,255,255,0.03)" />
                    
                    {/* Extruded Phone Base (Teal/Cyan neon highlights) */}
                    <g transform="translate(15, 30)">
                      <path d="M 0 50 L 50 25 L 90 45 L 40 70 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                      <path d="M 0 50 L 0 55 L 40 75 L 40 70 Z" fill="rgba(0,0,0,0.15)" />
                      <path d="M 40 70 L 40 75 L 90 50 L 90 45 Z" fill="rgba(0,0,0,0.08)" />
                    </g>

                    {/* Floating profile card with stars */}
                    <g transform="translate(70, 0)">
                      <path d="M 0 40 L 70 5 L 130 35 L 60 70 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                      {/* Ratings stars (yellow/gold glow) */}
                      <path d="M 20 35 L 50 20" stroke="var(--color-saffron)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                      {/* Service list items (white/light lines) */}
                      <path d="M 20 45 L 75 22" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 20 53 L 60 36" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
                    </g>

                    {/* 3D Map Pin */}
                    <g transform="translate(130, -20)">
                      <ellipse cx="20" cy="65" rx="12" ry="5" fill="rgba(0,0,0,0.15)" />
                      {/* Pin path */}
                      <path d="M 20 15 C 5 15, 5 35, 20 65 C 35 35, 35 15, 20 15 Z" fill="url(#pinGradBanner)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                      <circle cx="20" cy="30" r="5" fill="#ffffff" />
                    </g>
                  </g>
                  <defs>
                    <linearGradient id="pinGradBanner" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-terracotta)" />
                      <stop offset="100%" stopColor="var(--color-saffron)" />
                    </linearGradient>
                  </defs>
                </svg>

                <span className="relative z-10 block text-[1.4rem] font-black leading-snug text-white sm:text-xl lg:text-2xl uppercase tracking-tight">
                  Upgrade your Google Business Profile
                </span>
                <span className="relative z-10 mt-1 block text-[1.75rem] font-black leading-none text-saffron drop-shadow-sm sm:text-2xl lg:text-3xl uppercase tracking-tighter">
                  to get more clients!
                </span>
              </h1>
            </div>
            <div className="mx-auto my-8 max-w-prose text-center animate-slide-in-left duration-500">
              <h2 className="text-[1.15rem] font-bold leading-normal text-slate-800 sm:text-2xl flex items-center justify-center gap-1.5 flex-wrap">
                <span>✨ There are</span>
                <span className="relative inline-block text-terracotta font-black px-1.5 z-10">
                  three actions
                  <span className="absolute left-0 bottom-[1.5px] h-[6px] w-full bg-saffron/60 rounded-full -z-10" />
                </span>
                <span>that will help you achieve this:</span>
              </h2>
            </div>
            {/* Combined Listicle & Character Card */}
            <div className="mt-6 rounded-3xl border border-terracotta/15 bg-card/90 p-4 shadow-soft sm:p-6">
              <div className="space-y-4">
                {/* Item 1 */}
                <div
                  style={{ animationDelay: "150ms" }}
                  className="flex items-center gap-3.5 rounded-2xl border-2 border-teal/15 bg-teal/5 p-4 shadow-soft hover:shadow-lift transition-all hover:scale-[1.02] active:scale-[0.99] duration-300 animate-slide-in-left"
                >
                  <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-teal text-white font-extrabold text-xs shadow-soft">
                    1
                  </span>
                  <BrowserIcon className="h-5 w-5 text-teal shrink-0" />
                  <span className="text-sm font-semibold text-slate-800 sm:text-base">
                    <span className="text-teal font-extrabold">Add</span> a professional website.
                  </span>
                </div>

                {/* Item 2 */}
                <div
                  style={{ animationDelay: "300ms" }}
                  className="flex items-center gap-3.5 rounded-2xl border-2 border-terracotta/15 bg-terracotta/5 p-4 shadow-soft hover:shadow-lift transition-all hover:scale-[1.02] active:scale-[0.99] duration-300 animate-slide-in-left"
                >
                  <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-terracotta text-white font-extrabold text-xs shadow-soft">
                    2
                  </span>
                  <GridIcon className="h-5 w-5 text-terracotta shrink-0" />
                  <span className="text-sm font-semibold text-slate-800 sm:text-base">
                    <span className="text-terracotta font-extrabold">List</span> all your products or services.
                  </span>
                </div>

                {/* Item 3 */}
                <div
                  style={{ animationDelay: "450ms" }}
                  className="flex items-center gap-3.5 rounded-2xl border-2 border-whatsapp/15 bg-whatsapp/5 p-4 shadow-soft hover:shadow-lift transition-all hover:scale-[1.02] active:scale-[0.99] duration-300 animate-slide-in-left"
                >
                  <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white font-extrabold text-xs shadow-soft">
                    3
                  </span>
                  <WhatsAppIcon className="h-5 w-5 text-whatsapp fill-whatsapp shrink-0" />
                  <span className="text-sm font-semibold text-slate-800 sm:text-base">
                    <span className="text-whatsapp font-extrabold">Make</span> an easy way to connect using WhatsApp.
                  </span>
                </div>
              </div>

              {/* Decorative Divider */}
              <div className="my-5 border-t border-border" />

              {/* Character */}
              <div className="flex flex-col items-center">
                <img
                  src={characterHero}
                  alt="Friendly guide pointing up"
                  width={896}
                  height={1152}
                  className="mx-auto h-auto w-full max-w-[180px] object-contain sm:max-w-[220px]"
                />
              </div>
            </div>

            <p className="mt-6 text-center text-sm font-extrabold text-primary">
              Do everything, starting at only ₹99.
            </p>

            <div className="mt-4">
              <PrimaryButton onClick={() => setStep(1)}>Let's Begin</PrimaryButton>
            </div>

            <p className="mt-6 text-center text-xs font-semibold text-muted-foreground tracking-wide uppercase">
              LTAB — Your 360° Digital Partner
            </p>
          </StepShell>
        )}

        {step === 1 && (
          <StepShell stepKey="s1">
            <Guide text="Quick question first — it takes 10 seconds." />
            <h2 className="text-balance text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
              Do you have a Google Business Profile (the listing that shows on Google Maps/Search)?
            </h2>

            <div className="mt-5 rounded-3xl border border-terracotta/15 bg-card/90 p-3 shadow-soft sm:p-5">
              <GoogleDashboardMockup hasErrors={false} />
            </div>

            <div className="mt-5 space-y-3">
              <ChoiceButton
                variant="green"
                onClick={() => {
                  update({ hasGMB: "yes" });
                  setStep(2);
                }}
              >
                Yes
              </ChoiceButton>
              <ChoiceButton
                variant="red"
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
            <Guide text="Great! Let's check your website needs." />
            <h2 className="text-balance text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
              Do you want to build a quick website to achieve these 3 things?
            </h2>
            
            <ul className="mt-4 space-y-2.5 text-left border rounded-2xl bg-card p-4 border-border">
              <li className="flex gap-2.5 text-sm font-semibold text-muted-foreground">
                <span className="text-teal font-extrabold">1.</span>
                <span>Connect your website to your Google Business Profile to get traffic</span>
              </li>
              <li className="flex gap-2.5 text-sm font-semibold text-muted-foreground">
                <span className="text-teal font-extrabold">2.</span>
                <span>Add your services and products to the website</span>
              </li>
              <li className="flex gap-2.5 text-sm font-semibold text-muted-foreground">
                <span className="text-teal font-extrabold">3.</span>
                <span>Make your business easily searchable on Google</span>
              </li>
            </ul>

            <div className="mt-5 space-y-3">
              <ChoiceButton
                variant="green"
                onClick={() => {
                  update({ websiteLinked: "no" });
                  setStep(3);
                }}
              >
                Yes, let's build it!
              </ChoiceButton>
              <ChoiceButton
                variant="red"
                onClick={() => {
                  update({ websiteLinked: "yes" });
                  setStep(25);
                }}
              >
                No, I already have one linked
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
                const match = service.match(/^(.*?)\s*\((.*?)\)$/);
                const title = match ? match[1] : service;
                const description = match ? match[2] : "";

                return (
                  <label
                    key={service}
                    className={`flex min-h-[3.25rem] cursor-pointer items-center gap-3 rounded-2xl border-2 bg-card px-4 py-4 text-base shadow-soft transition-all hover:shadow-lift sm:px-5 ${
                      checked ? "border-teal bg-teal/5" : "border-border"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(service)}
                      className="h-5 w-5 shrink-0 accent-[var(--color-teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <div className="flex flex-col text-left">
                      <span className="font-extrabold text-card-foreground text-sm sm:text-base">{title}</span>
                      {description && (
                        <span className="text-xs font-normal text-muted-foreground mt-0.5">({description})</span>
                      )}
                    </div>
                  </label>
                );
              })}
            </fieldset>
            <p className="mt-3 text-sm text-muted-foreground">
              Also ask us about custom digital marketing services.
            </p>
             <div className="mt-5">
              <PrimaryButton
                onClick={() => {
                  if (!answers.selectedPlan) {
                    update({
                      selectedPlan: `Additional services: ${
                        answers.extraServices.length ? answers.extraServices.join(", ") : "to discuss"
                      }`,
                    });
                  }
                  setStep(45);
                }}
              >
                {answers.selectedPlan ? "Proceed to Summary" : "Talk to Our Team"}
              </PrimaryButton>
            </div>
            <button
              type="button"
              onClick={() => {
                if (answers.selectedPlan && !answers.selectedPlan.startsWith("Additional services")) {
                  // Clear selection when going back to plan screen
                  update({ selectedPlan: "" });
                  setStep(4);
                } else {
                  setStep(2);
                }
              }}
              className="mx-auto mt-6 block min-h-[2.75rem] rounded-full px-5 py-2 text-sm font-semibold text-terracotta underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              ← Back
            </button>
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

            <div className="mt-5 overflow-hidden rounded-3xl border-2 border-teal/40 bg-card shadow-lift">
              <div className="bg-gradient-to-r from-teal to-primary px-4 py-3 sm:px-5">
                <p className="text-base font-extrabold text-white sm:text-lg">
                  Custom Website — ₹4,999
                </p>
                <p className="mt-0.5 text-xs font-medium text-white/80">
                  For businesses that want more
                </p>
              </div>
              <div className="p-4 sm:p-5">
                <ul className="space-y-2">
                  <li className="flex gap-2 text-sm text-muted-foreground">
                    <span aria-hidden="true" className="shrink-0 font-bold text-teal">✓</span>
                    <span>Multiple pages for products, services &amp; more</span>
                  </li>
                  <li className="flex gap-2 text-sm text-muted-foreground">
                    <span aria-hidden="true" className="shrink-0 font-bold text-teal">✓</span>
                    <span>SEO-optimized to rank higher on Google</span>
                  </li>
                  <li className="flex gap-2 text-sm text-muted-foreground">
                    <span aria-hidden="true" className="shrink-0 font-bold text-teal">✓</span>
                    <span>Custom design tailored to your brand</span>
                  </li>
                  <li className="flex gap-2 text-sm text-muted-foreground">
                    <span aria-hidden="true" className="shrink-0 font-bold text-teal">✓</span>
                    <span>WhatsApp Connect on every page</span>
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => selectPlan("₹4,999 — Custom Website")}
                  className="mt-4 min-h-[3.25rem] w-full rounded-2xl bg-gradient-to-r from-teal to-primary px-5 py-4 text-base font-extrabold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lift active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-lg"
                >
                  Choose ₹4,999 Plan
                </button>
              </div>
            </div>
          </StepShell>
        )}

        {step === 45 && (
          <StepShell stepKey="s45">
            <Guide text="Here's a quick look at everything we'll set up for you." />
            <h2 className="text-balance text-[1.5rem] font-extrabold leading-tight text-foreground sm:text-3xl">
              Here's What You're Getting
            </h2>

            <div className="mt-5 space-y-4">
              {/* Selected Plan */}
              <div className="overflow-hidden rounded-3xl border-2 border-terracotta/30 bg-card shadow-soft">
                <div className="flex items-center gap-3 bg-gradient-to-r from-terracotta to-saffron px-4 py-3 sm:px-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg" aria-hidden="true">📦</span>
                  <div>
                    <p className="text-base font-extrabold text-terracotta-foreground sm:text-lg">Your Plan</p>
                    {answers.businessType && (
                      <p className="text-xs font-medium text-terracotta-foreground/80">
                        Tailored for your {answers.businessType === "both" ? "product + service" : answers.businessType} business
                      </p>
                    )}
                  </div>
                </div>
                <div className="px-4 py-3 sm:px-5">
                  <p className="text-sm font-bold text-foreground">{answers.selectedPlan}</p>
                  <ul className="mt-2 space-y-1.5">
                    {answers.selectedPlan.includes("4,999") ? (
                      <>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Multi-page custom website with unique design</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Separate pages for products, services, about & contact</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>SEO-optimized structure to rank higher on Google</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>WhatsApp Connect button on every page</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Mobile-responsive & fast loading</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Custom domain setup assistance</span>
                        </li>
                      </>
                    ) : answers.businessType === "product" ? (
                      <>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Digital product catalog with photos</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Direct-to-WhatsApp ordering on every product</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>No app needed — customers tap and chat</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Mobile-friendly & professional design</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Live within 24 hours</span>
                        </li>
                      </>
                    ) : answers.businessType === "service" ? (
                      <>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Professional service listing with clear descriptions</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>One-click WhatsApp connect button</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Looks professional on all devices</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Live within 24 hours</span>
                        </li>
                      </>
                    ) : answers.businessType === "both" ? (
                      <>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Combined products & services on one page</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>WhatsApp connect on every section</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Clean, professional & mobile-friendly</span>
                        </li>
                        <li className="flex gap-2 text-sm text-muted-foreground">
                          <span className="shrink-0 font-bold text-terracotta">✓</span>
                          <span>Live within 24 hours</span>
                        </li>
                      </>
                    ) : (
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-terracotta">✓</span>
                        <span>Custom consultation with our team</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Google Ads - shown only if selected */}
              {answers.extraServices.includes("Google Ads (to get more audience)") && (
                <div className="overflow-hidden rounded-3xl border-2 border-google-blue/30 bg-card shadow-soft">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-google-blue to-blue-500 px-4 py-3 sm:px-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg" aria-hidden="true">📢</span>
                    <div>
                      <p className="text-base font-extrabold text-white sm:text-lg">Google Ads</p>
                      <p className="text-xs font-medium text-white/80">Get more audience & traffic</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-5">
                    <ul className="space-y-1.5">
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-google-blue">✓</span>
                        <span>Google Ads campaign setup & launch</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-google-blue">✓</span>
                        <span>Keyword research & high-intent targeting</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-google-blue">✓</span>
                        <span>Ad copywriting that drives clicks & calls</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-google-blue">✓</span>
                        <span>Budget optimization & bid management</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-google-blue">✓</span>
                        <span>Monthly performance tracking & reports</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Digital Marketing - shown only if selected */}
              {answers.extraServices.includes("Digital Marketing (for branding)") && (
                <div className="overflow-hidden rounded-3xl border-2 border-saffron/30 bg-card shadow-soft">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-saffron to-terracotta/80 px-4 py-3 sm:px-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg" aria-hidden="true">📱</span>
                    <div>
                      <p className="text-base font-extrabold text-terracotta-foreground sm:text-lg">Digital Marketing</p>
                      <p className="text-xs font-medium text-terracotta-foreground/80">Build your brand identity</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-5">
                    <ul className="space-y-1.5">
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-saffron">✓</span>
                        <span>Brand positioning & consulting</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-saffron">✓</span>
                        <span>Content marketing & branding calendar</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-saffron">✓</span>
                        <span>Creative post designs (images & reels)</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-saffron">✓</span>
                        <span>Social media branding templates</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-saffron">✓</span>
                        <span>Monthly reach & brand metrics reports</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Photography - shown only if selected */}
              {answers.extraServices.includes("Photography") && (
                <div className="overflow-hidden rounded-3xl border-2 border-primary/30 bg-card shadow-soft">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-primary to-teal px-4 py-3 sm:px-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg" aria-hidden="true">📸</span>
                    <div>
                      <p className="text-base font-extrabold text-white sm:text-lg">Photography</p>
                      <p className="text-xs font-medium text-white/80">Professional visuals for your business</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-5">
                    <ul className="space-y-1.5">
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-primary">✓</span>
                        <span>Professional product/business photoshoot</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-primary">✓</span>
                        <span>High-quality edited visual assets (15–20 photos)</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-primary">✓</span>
                        <span>Optimized for website, maps & social media</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-primary">✓</span>
                        <span>Full commercial usage rights included</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Business Automation - shown only if selected */}
              {answers.extraServices.includes("Business Automation (to ease the work)") && (
                <div className="overflow-hidden rounded-3xl border-2 border-teal/30 bg-card shadow-soft">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-teal to-primary px-4 py-3 sm:px-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg" aria-hidden="true">⚙️</span>
                    <div>
                      <p className="text-base font-extrabold text-white sm:text-lg">Business Automation</p>
                      <p className="text-xs font-medium text-white/80">Automate tasks & ease daily work</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-5">
                    <ul className="space-y-1.5">
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-teal">✓</span>
                        <span>WhatsApp lead routing & CRM automation</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-teal">✓</span>
                        <span>Quick-replies & auto-responder setup</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-teal">✓</span>
                        <span>UPI & QR code digital payment integrations</span>
                      </li>
                      <li className="flex gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 font-bold text-teal">✓</span>
                        <span>Automated workflows (save 5+ hours weekly)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* GMB & Website Status */}
              <div className="overflow-hidden rounded-3xl border-2 border-border bg-card shadow-soft">
                <div className="flex items-center gap-3 bg-gradient-to-r from-secondary to-muted px-4 py-3 sm:px-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/50 text-lg" aria-hidden="true">📍</span>
                  <div>
                    <p className="text-base font-extrabold text-foreground sm:text-lg">Your Digital Presence</p>
                    <p className="text-xs font-medium text-muted-foreground">Google Business & website status</p>
                  </div>
                </div>
                <div className="px-4 py-3 sm:px-5 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`shrink-0 font-bold ${answers.hasGMB === "yes" ? "text-teal" : "text-terracotta"}`}>
                      {answers.hasGMB === "yes" ? "✓" : "✗"}
                    </span>
                    <span className="text-muted-foreground">
                      Google Business Profile — {answers.hasGMB === "yes" ? "Active" : "We'll help you set it up"}
                    </span>
                  </div>
                  {answers.hasGMB === "yes" && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`shrink-0 font-bold ${answers.websiteLinked === "yes" ? "text-teal" : "text-terracotta"}`}>
                        {answers.websiteLinked === "yes" ? "✓" : "✗"}
                      </span>
                      <span className="text-muted-foreground">
                        Website linked to GMB — {answers.websiteLinked === "yes" ? "Connected" : "We'll connect it for you"}
                      </span>
                    </div>
                  )}
                  {answers.hasGMB === "no" && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="shrink-0 font-bold text-teal">+</span>
                      <span className="text-muted-foreground">Free GMB setup included with your plan</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* No upfront payment reminder */}
            <p className="mt-4 rounded-2xl border border-teal/25 bg-teal/10 px-4 py-3 text-center text-sm font-medium text-foreground">
              🎉 No upfront payment — you only pay once you're happy with it!
            </p>

            <div className="mt-5">
              <PrimaryButton onClick={() => setStep(5)}>
                Looks Good — Let's Go!
              </PrimaryButton>
            </div>
            <button
              type="button"
              onClick={() => setStep(answers.businessType ? 4 : 25)}
              className="mx-auto mt-6 block min-h-[2.75rem] rounded-full px-5 py-2 text-sm font-semibold text-terracotta underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              ← Back
            </button>
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
                s === 5 ? 45 : s === 45 ? 25 : s === 4 ? 3 : s === 25 ? (answers.selectedPlan && !answers.selectedPlan.startsWith("Additional services") ? 4 : 2) : s === 3 ? (answers.hasGMB === "yes" ? 2 : 1) : s === 2 ? 1 : 0,
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
