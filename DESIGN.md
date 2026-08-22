# 360° Growth Partner — Design System Specification

This document captures the UI style, colors, typography, spacing, and components used in the **360° Growth Partner** conversational landing page. You can copy these values directly into another app to keep the same look and feel.

---

## 1. Visual Character

- **Mascot:** A young, friendly 3D cartoon male character with glasses and casual clothing (olive-green shirt). He appears in the hero as a full-body image and as a circular bust/thumbs-up avatar during the step-by-step flow.
- **Mood:** Warm, calm, approachable, trustworthy. No loud or saturated colors.
- **Shape Language:** Large rounded corners, soft shadows, circular avatars, rounded-2xl buttons/cards.

---

## 2. Typography

### Font
- **Primary font:** `Nunito` (Google Fonts)
- **Weights loaded:** 400, 500, 600, 700, 800, 900
- **Fallback stack:** `"Nunito", ui-sans-serif, system-ui, sans-serif`

### How to load it
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Typography scale (Tailwind classes used)
| Element | Tailwind classes |
|---|---|
| Hero H1 | `text-3xl font-extrabold leading-tight tracking-tight` |
| Step H2 | `text-xl font-bold leading-snug` or `text-2xl font-extrabold leading-tight` |
| Body | `text-base leading-relaxed` |
| Small / hints | `text-sm` / `text-[0.7rem]` |
| Button text | `text-base font-bold` |
| Pill label | `text-xs font-bold` |

---

## 3. Color Palette

Colors are defined in `oklch` format in the CSS theme. All semantic names map to Tailwind utilities like `bg-primary`, `text-foreground`, etc.

### Core semantic tokens

| Token | OKLCH value | Approximate HEX | Usage |
|---|---|---|---|
| `--background` | `oklch(0.965 0.018 84)` | `#f7f1e6` | Page background (warm beige/cream) |
| `--foreground` | `oklch(0.29 0.03 62)` | `#3d352e` | Main text, headings |
| `--card` | `oklch(0.995 0.008 84)` | `#fffdf9` | Card surfaces |
| `--card-foreground` | `oklch(0.29 0.03 62)` | `#3d352e` | Text on cards |
| `--primary` | `oklch(0.52 0.07 140)` | `#5b7a55` | Primary CTA buttons, olive green |
| `--primary-foreground` | `oklch(0.98 0.012 100)` | `#f9fcf7` | Text on primary buttons |
| `--secondary` | `oklch(0.93 0.026 82)` | `#ede7db` | Secondary surfaces, progress track |
| `--secondary-foreground` | `oklch(0.34 0.035 60)` | `#4f443b` | Text on secondary surfaces |
| `--muted` | `oklch(0.94 0.02 84)` | `#f1ece2` | Muted backgrounds |
| `--muted-foreground` | `oklch(0.52 0.03 65)` | `#7d7268` | Captions, hints, subtext |
| `--accent` | `oklch(0.9 0.035 92)` | `#f3e6d3` | Accent blocks, avatar background |
| `--accent-foreground` | `oklch(0.32 0.04 58)` | `#4a3f35` | Text on accent |
| `--destructive` | `oklch(0.55 0.16 27)` | `#c73c3c` | Error text |
| `--destructive-foreground` | `oklch(0.98 0.01 90)` | `#fff8f8` | Text on destructive |
| `--border` | `oklch(0.89 0.025 82)` | `#ddd7cd` | Card borders, input borders |
| `--input` | `oklch(0.89 0.025 82)` | `#ddd7cd` | Input borders |
| `--ring` | `oklch(0.52 0.07 140)` | `#5b7a55` | Focus rings |
| `--whatsapp` | `oklch(0.63 0.14 152)` | `#25d366` | WhatsApp buttons/pills |
| `--whatsapp-foreground` | `oklch(0.99 0.01 120)` | `#ffffff` | Text on WhatsApp green |
| `--google-blue` | `oklch(0.62 0.15 255)` | `#4285f4` | Google/accent blue highlights |
| `--cream` | `oklch(0.97 0.017 85)` | `#f8f3ea` | Extra warm cream token |

### Dark mode (auto-generated; not the primary experience)
If you keep dark mode, the palette switches to a deep slate theme.

---

## 4. Shadows

All shadows use warm-tinted transparency.

```css
--shadow-soft: 0 2px 8px oklch(0.4 0.05 70 / 0.06), 0 12px 32px oklch(0.4 0.05 70 / 0.08);
--shadow-lift: 0 18px 44px oklch(0.4 0.05 70 / 0.14);
```

Use `shadow-soft` on cards and `shadow-lift` on hover/active states.

---

## 5. Border Radius

```css
--radius: 1.1rem;
```

Mapped utility classes:
- `rounded-sm`: `calc(var(--radius) - 4px)` ≈ `0.7rem`
- `rounded-md`: `calc(var(--radius) - 2px)` ≈ `0.9rem`
- `rounded-lg`: `var(--radius)` ≈ `1.1rem`
- `rounded-xl`: `calc(var(--radius) + 4px)` ≈ `1.5rem`
- `rounded-2xl`: `calc(var(--radius) + 8px)` ≈ `1.9rem`
- `rounded-3xl`: `calc(var(--radius) + 12px)` ≈ `2.3rem`
- `rounded-4xl`: `calc(var(--radius) + 16px)` ≈ `2.7rem`

Common components:
- Buttons: `rounded-2xl`
- Cards: `rounded-3xl`
- Phone frame: `rounded-[1.6rem]` outer, `rounded-[1.2rem]` inner
- Avatar: `rounded-full`
- Inputs/select: `rounded-2xl`

---

## 6. Animations

### Step-in transition
```css
@keyframes step-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

--animate-step-in: step-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
```

Use `animate-step-in` class on each step container so it fades and slides up when mounted.

### Soft pulse (WhatsApp CTAs)
```css
@keyframes soft-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 oklch(0.63 0.14 152 / 0.35);
  }
  50% {
    box-shadow: 0 0 0 12px oklch(0.63 0.14 152 / 0);
  }
}

--animate-soft-pulse: soft-pulse 2.4s ease-in-out infinite;
```

Apply `animate-soft-pulse` to WhatsApp buttons to give a gentle breathing glow.

---

## 7. Layout

- **Mobile-first:** container is `max-w-md` (448px) centered with `mx-auto`.
- **Page padding:** `px-5 pb-14` on the content wrapper.
- **Header:** centered logo badge + brand name, `pt-5 pb-3`.
- **Cards:** full-width cards with `p-5` or `p-6` internal padding.
- **Vertical rhythm:** `mt-5` / `mt-6` between major sections, `space-y-3` between choice buttons.
- **Accessibility:** tap targets are at least 44px high; focus rings use `ring-2 ring-ring ring-offset-2`.

---

## 8. Component Recipes

Copy the Tailwind class strings directly.

### Primary CTA Button
```jsx
<button className="w-full rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-soft transition-all hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] disabled:opacity-60">
  Get My ₹99 Website
</button>
```

### Choice Button
```jsx
<button className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-left text-base font-semibold text-card-foreground shadow-soft transition-all hover:border-primary hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99]">
  Yes
  <span className="mt-1 block text-sm font-normal text-muted-foreground">Optional hint text</span>
</button>
```

### Guide Avatar + Speech Bubble
```jsx
<div className="mb-5 flex items-center gap-3">
  <img
    src="/character-guide.png"
    alt="Your guide"
    className="h-14 w-14 shrink-0 rounded-full bg-accent object-cover"
  />
  <p className="rounded-2xl rounded-bl-sm bg-card px-4 py-2.5 text-sm text-muted-foreground shadow-soft">
    Quick question first — it takes 10 seconds.
  </p>
</div>
```

### Phone Mockup Frame
```jsx
<figure className="m-0 w-full">
  <div className="rounded-[1.6rem] border border-border bg-card p-2 shadow-soft">
    <div className="rounded-[1.2rem] bg-background p-3">
      {/* screen content */}
    </div>
  </div>
  <figcaption className="mt-2 text-center text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
    Before
  </figcaption>
</figure>
```

### WhatsApp Pill
```jsx
<span className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-3 py-1.5 text-xs font-bold text-whatsapp-foreground">
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-6.5-5.7c-.4-.8-.4-1.5-.2-2 .2-.4.7-1 1-1.1.3-.1.7 0 .9.4l.7 1.4c.1.3 0 .5-.1.7l-.4.5c-.1.2-.2.4 0 .7a8 8 0 0 0 3.2 2.8c.3.1.5.1.7-.1l.6-.6c.2-.2.4-.2.7-.1l1.4.7c.4.2.5.5.4.9Z" />
  </svg>
  Every enquiry lands on WhatsApp
</span>
```

### WhatsApp CTA Button
```jsx
<a className="flex w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp px-6 py-4 text-base font-bold text-whatsapp-foreground shadow-soft transition-all hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Message Us on WhatsApp
</a>
```

### Progress Bar
```jsx
<div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary" role="progressbar" aria-label="Progress">
  <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: '16%' }} />
</div>
<div className="mt-2 flex justify-center gap-1.5" aria-hidden="true">
  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
  <span className="h-1.5 w-1.5 rounded-full bg-border" />
</div>
```

### Input Field
```jsx
<input
  className="w-full rounded-2xl border border-input bg-card px-4 py-3.5 text-base text-card-foreground shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  placeholder="10-digit mobile number"
/>
```

### Checkbox Choice Card
```jsx
<label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-base font-semibold shadow-soft transition-colors hover:border-primary">
  <input type="checkbox" className="h-5 w-5 accent-[var(--primary)]" />
  <span className="text-card-foreground">SEO</span>
</label>
```

### Google Info Row
```jsx
<div className="flex items-center gap-2 rounded-lg bg-secondary/60 px-2 py-1.5 text-[0.65rem] text-secondary-foreground">
  <span className="font-bold text-google-blue">Website</span> linked
</div>
```

---

## 9. Funnel Copy

### Step 0 — Hero
- **H1:** `A Website for Your Business — Just ₹99.`
- **Subheadline:** `So people can see what you offer and contact you on WhatsApp or call, instantly.`
- **Social proof:** `Trusted by 100+ businesses already.`
- **CTA:** `Get My ₹99 Website`

### Step 1 — GMB Check
- **Guide:** `Quick question first — it takes 10 seconds.`
- **Question:** `Do you have a Google Business Profile (the listing that shows on Google Maps/Search)?`
- **Choices:** `Yes`, `No`

### Step 2 — Website Link Check
- **Guide:** `Great! Let's check how it's set up.`
- **Question:** `Is your website properly linked on your GMB listing?`
- **Choices:** `Yes, it's linked and working`, `No / Not sure / Needs improvement`

### Step 2A — Additional Services (if website linked)
- **Guide:** `Nicely done — you're ahead of most local businesses.`
- **Question:** `Nice! What else are you looking for?`
- **Options:** `SEO`, `Google Ads`, `Social Media Management`, `Photography`
- **CTA:** `Talk to Our Team`
- **Note:** `Also ask us about custom digital marketing services.`

### Step 3 — Business Type
- **Guide:** `Last bit — so we build the right page for you.`
- **Question:** `Tell us about your business`
- **Choices:** `I sell products`, `I offer a service`, `Both`

### Step 4 — Tailored Offer

#### Service offer
- **Headline:** `A Simple Page That Turns Visitors Into Calls`
- **Plan:** `₹99/month — Simple Landing Page`
- **Bullets:**
  - List your services clearly
  - One-click WhatsApp Connect button
  - Looks professional on mobile
  - Live within 24 hours
- **Upsell:** `Need multiple pages or want to rank higher on Google? Custom Website — ₹4,999`

#### Product offer
- **Headline:** `A Digital Catalog Your Customers Can Browse and Order From`
- **Plan:** `₹99/month — Digital Catalog Page`
- **Bullets:**
  - Showcase your products with photos
  - Direct-to-WhatsApp ordering button on every product
  - No app needed — customers just tap and chat
  - Live within 24 hours
- **Upsell:** `Want more products, categories, or a full multi-page site? Custom Website — ₹4,999`

#### Both offer
- **Headline:** `One Page, Everything You Offer`
- **Plan:** `₹99/month — Combined Landing Page`
- **Bullets:**
  - Show products AND services in one page
  - WhatsApp Connect on every section
  - Clean, simple, professional
  - Live within 24 hours
- **Upsell:** `Want a bigger site with separate pages for each? Custom Website — ₹4,999`

### Trust line (shown in offer card)
`We build it first. You only pay once you're happy with it — no upfront payment.`

### Step 5 — Booking Form
- **Guide:** `Almost there — just your details.`
- **H2:** `Let's Get This Live For You`
- **Subtext:** `Our team will call you to confirm the details — remember, you only pay once you've seen it and you're happy with it.`
- **Fields:** Name, Phone Number (10-digit Indian mobile), Preferred time to connect (`Morning` / `Afternoon` / `Evening`)
- **Submit CTA:** `Book My Free Call`
- **Validation message:** `Enter a valid 10-digit Indian mobile number.`

### Step 6 — Thank You
- **H2:** `You're All Set! 🎉`
- **Subtext:** `Our team will reach out during your preferred time. Want to chat right now instead?`
- **WhatsApp CTA:** `Message Us on WhatsApp`
- **Footer:** `360° Growth Partner — Trusted by 100+ businesses`

---

## 10. WhatsApp Integration

- **Agency number:** `916000683808` (format with country code for `wa.me`)
- **Base link builder:** `https://wa.me/${number}?text=${encodeURIComponent(message)}`
- **Lead message template:**
  ```
  New booking request — 360° Growth Partner
  Name: {name}
  Phone: {phone}
  Preferred time: {preferredTime}
  Google Business Profile: {hasGMB}
  Website linked: {websiteLinked}
  Business type: {businessType}
  Interested in: {selectedPlan}
  ```

---

## 11. Mobile Validation

- Strip non-digits and remove leading `91` if present.
- Validate with regex: `/^[6-9]\d{9}$/`
- Max input length: 14 characters to allow spaces/dashes.
- Input type: `tel` with `inputMode="numeric"`, `autoComplete="tel"`.

---

## 12. Assets

- **Hero character:** `src/assets/character-hero.png` (full-body, relaxed pose)
- **Guide character:** `src/assets/character-guide.png` (bust/thumbs-up, circular crop)
- Use `object-cover` on the guide image inside a `rounded-full bg-accent` container.

---

## 13. Copy-Paste CSS Theme Block

If you are using Tailwind CSS v4, add this to your `src/styles.css`:

```css
@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";

@theme {
  --font-sans: "Nunito", ui-sans-serif, system-ui, sans-serif;
  --color-whatsapp: oklch(0.63 0.14 152);
  --color-whatsapp-foreground: oklch(0.99 0.01 120);
  --color-google-blue: oklch(0.62 0.15 255);
  --color-cream: oklch(0.97 0.017 85);
  --shadow-soft: 0 2px 8px oklch(0.4 0.05 70 / 0.06), 0 12px 32px oklch(0.4 0.05 70 / 0.08);
  --shadow-lift: 0 18px 44px oklch(0.4 0.05 70 / 0.14);
  --animate-step-in: step-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  --animate-soft-pulse: soft-pulse 2.4s ease-in-out infinite;
}

@keyframes step-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes soft-pulse {
  0%, 100% { box-shadow: 0 0 0 0 oklch(0.63 0.14 152 / 0.35); }
  50% { box-shadow: 0 0 0 12px oklch(0.63 0.14 152 / 0); }
}

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}

:root {
  --radius: 1.1rem;
  --background: oklch(0.965 0.018 84);
  --foreground: oklch(0.29 0.03 62);
  --card: oklch(0.995 0.008 84);
  --card-foreground: oklch(0.29 0.03 62);
  --primary: oklch(0.52 0.07 140);
  --primary-foreground: oklch(0.98 0.012 100);
  --secondary: oklch(0.93 0.026 82);
  --secondary-foreground: oklch(0.34 0.035 60);
  --muted: oklch(0.94 0.02 84);
  --muted-foreground: oklch(0.52 0.03 65);
  --accent: oklch(0.9 0.035 92);
  --accent-foreground: oklch(0.32 0.04 58);
  --destructive: oklch(0.55 0.16 27);
  --destructive-foreground: oklch(0.98 0.01 90);
  --border: oklch(0.89 0.025 82);
  --input: oklch(0.89 0.025 82);
  --ring: oklch(0.52 0.07 140);
}

@layer base {
  * { border-color: var(--color-border); }
  body { background-color: var(--color-background); color: var(--color-foreground); }
}
```

---

*Last updated: 2026-08-22*
