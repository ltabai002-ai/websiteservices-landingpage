# Growth Partner Flow

Build a single-page, mobile-first, interactive landing page (a step-by-step 

"conversational" flow, not a traditional scroll page) for a digital agency 

("360° Growth Partner") that helps small Indian businesses get a simple 

website linked to their Google Business Profile, so customers can see 

their services and reach them instantly on WhatsApp or call.

This page is the direct continuation of a Hinglish video ad the visitor 

just watched, so the visual style and character MUST match that ad exactly 

— do not use bright saffron/magenta colours or a generic "jolly mascot," 

use the specific character and palette described below.

=====================================================

VISUAL STYLE (must match the ad's character exactly)

=====================================================

- Character: a young, friendly, approachable 3D cartoon male character 

  with glasses, warm and inviting expression, casual modern clothing. 

  This same character should appear at the top of the page (Step 0) and 

  reappear in a smaller/simplified form as a guide at each step, giving 

  a warm nod, a thumbs up, or pointing at the relevant screen element.

- Background/setting: warm, minimalist small-business setting.

- Colour palette: warm and calm — beige, cream, soft browns, muted 

  greens. Use a soft blue-and-white accent ONLY when a phone screen, 

  Google profile, or website mockup appears on screen (to visually tie 

  back to "Google" and "digital" moments from the ad).

- Avoid loud, saturated colours (no bright orange/magenta/teal combos) 

  — keep everything soft, warm, and trustworthy, matching a calm local 

  business feel rather than a flashy tech-startup feel.

- Typography: clean, modern, friendly sans-serif. Rounded cards, soft 

  shadows, generous whitespace, smooth fade transitions between steps 

  (no jarring jumps, matching the ad's smooth pacing).

- Logo + tagline "360° Growth Partner" should appear in the header, 

  small and consistent on every step.

- Fully responsive, optimised for mobile since traffic comes from a 

  video ad on Google/Facebook.

=====================================================

FUNNEL LOGIC (multi-step state machine — show one step at a time, 

animate transitions between steps)

=====================================================

STEP 0 — HERO

Headline: "A Website for Your Business — Just ₹99."

Subtext: "So people can see what you offer and contact you on WhatsApp or 

call, instantly."

Visual: The main character standing warmly, with a simple before/after 

visual beside him — on the left, a phone showing a bare Google Business 

Profile (just a name, no services, no website, no WhatsApp button); an 

arrow or fade transition to the right showing the same profile now with 

a clean website linked — services listed, a couple of photos, and a 

glowing WhatsApp button. This mirrors the "before/after" moment from the 

brand's video ad, so it should feel immediately familiar to anyone who 

just watched it.

Small trust line beneath: "Trusted by 100+ businesses already."

CTA button: "Get My ₹99 Website" → goes to Step 1

STEP 1 — GMB CHECK

Question: "Do you have a Google Business Profile (the listing that shows 

on Google Maps/Search)?"

Options: [Yes] [No]

- If [Yes] → go to Step 2

- If [No] → skip directly to Step 3 (they clearly need something built)

STEP 2 — WEBSITE LINK CHECK (only shown if Step 1 = Yes)

Question: "Is your website properly linked on your GMB listing?"

Options: [Yes, it's linked and working] [No / Not sure / Needs improvement]

- If [Yes, it's linked and working] → go to Step 2A

- If [No / Not sure] → go to Step 3

STEP 2A — ADDITIONAL SERVICES (only shown if Step 2 = "linked and working")

Question: "Nice! What else are you looking for?"

Show checkboxes: [SEO] [Google Ads] [Social Media Management] [Photography]

Small line: "Also ask us about custom digital marketing services."

CTA: "Talk to Our Team" → go directly to Step 5 (Booking), skipping 

Step 3/4

STEP 3 — BUSINESS TYPE (shown for everyone who reaches here)

Question: "Tell us about your business"

Options: [I sell products] [I offer a service] [Both]

Store this answer as businessType = product | service | both

STEP 4 — TAILORED OFFER (content changes based on businessType)

  IF businessType == "service":

  Headline: "A Simple Page That Turns Visitors Into Calls"

  Show a mock preview card: business name, 3-4 listed services with 

  icons, and a big "Chat on WhatsApp" button.

  Plan card: "₹99/month — Simple Landing Page"

  Bullet copy: "List your services clearly", "One-click WhatsApp Connect 

  button", "Looks professional on mobile", "Live within 24 hours"

  Trust line inside the card: "We build it first. You only pay once 

  you're happy with it — no upfront payment."

  Upsell line below: "Need multiple pages or want to rank higher on 

  Google? Custom Website — ₹4,999" [Select this instead]

  IF businessType == "product":

  Headline: "A Digital Catalog Your Customers Can Browse and Order From"

  Show a mock preview: a grid of 3-4 product photo cards, each with an 

  "Order on WhatsApp" button. Explain: tapping a product's WhatsApp 

  button opens a WhatsApp chat pre-filled with a message referencing 

  that product (e.g. "Hi, I'm interested in [Product Name]"), so the 

  enquiry lands directly in the owner's WhatsApp.

  Plan card: "₹99/month — Digital Catalog Page"

  Bullet copy: "Showcase your products with photos", "Direct-to-WhatsApp 

  ordering button on every product", "No app needed — customers just tap 

  and chat", "Live within 24 hours"

  Trust line inside the card: "We build it first. You only pay once 

  you're happy with it — no upfront payment."

  Upsell line: "Want more products, categories, or a full multi-page 

  site? Custom Website — ₹4,999" [Select this instead]

  IF businessType == "both":

  Headline: "One Page, Everything You Offer"

  Show a combined preview: a short products section + a services list, 

  both leading to WhatsApp buttons.

  Plan card: "₹99/month — Combined Landing Page"

  Bullet copy: "Show products AND services in one page", "WhatsApp 

  Connect on every section", "Clean, simple, professional", "Live within 

  24 hours"

  Trust line inside the card: "We build it first. You only pay once 

  you're happy with it — no upfront payment."

  Upsell line: "Want a bigger site with separate pages for each? Custom 

  Website — ₹4,999" [Select this instead]

Note: We do NOT offer e-commerce/online checkout at this stage. Every path 

ends in a WhatsApp click-to-chat, not a cart or payment gateway. Do not 

show or imply any "buy now"/cart/checkout functionality anywhere.

User selects either the ₹99 plan or the ₹4,999 plan → store as 

selectedPlan → go to Step 5

STEP 5 — BOOKING (every single path in the entire funnel ends here — 

no exceptions, including the Step 2A "additional services" path)

Headline: "Let's Get This Live For You"

Subtext: "Our team will call you to confirm the details — remember, you 

only pay once you've seen it and you're happy with it."

Form fields:

  - Name (text, required)

  - Phone Number (tel, required, validate as 10-digit Indian mobile number)

  - Preferred time to connect (dropdown: Morning / Afternoon / Evening, 

    or a simple time picker)

Hidden fields to capture and submit silently along with the form (for the 

internal CRM/dashboard, not shown to the user):

  - hasGMB (yes/no)

  - websiteLinked (yes/no/not sure)

  - businessType (product/service/both)

  - selectedPlan (₹99/₹4,999/additional services list)

Submit button label: "Book My Free Call"

STEP 6 — THANK YOU

Headline: "You're All Set! 🎉"

Subtext: "Our team will reach out during your preferred time. Want to 

chat right now instead?"

Secondary CTA button: "Message Us on WhatsApp" (opens a wa.me link 

straight to the agency's WhatsApp number)

Small footer line: "360° Growth Partner — Trusted by 100+ businesses"

=====================================================

TECHNICAL REQUIREMENTS

=====================================================

- Build this as a single React component using a step/state variable 

  (e.g. currentStep) so only one question/screen is visible at a time, 

  with a smooth fade/slide transition between steps (matching the ad's 

  smooth-fade transition style — no jarring cuts).

- Store all user answers in a single state object throughout the session 

  so they can be submitted together at the final step.

- On final submit, send all collected data (visible + hidden fields) to 

  [INSERT: Supabase table / Google Sheet / webhook / email].

- WhatsApp buttons should use "https://wa.me/<AGENCY_NUMBER>?text=<pre-filled message>" 

  links, with the message text pre-filled and URL-encoded based on 

  context (e.g. referencing the product name for catalog buttons).

- Include a progress indicator (small dots or thin progress bar) at the 

  top so users see how many steps remain.

- Fully keyboard and screen-reader accessible; large tap targets for 

  mobile.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://digital-guide-chat.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4293b6aa-921d-456f-88ba-34591365670c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
