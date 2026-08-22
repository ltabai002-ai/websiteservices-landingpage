Create a downloadable design specification document

Goal: Save the current UI/design details used in the 360° Growth Partner landing page as a file the user can download.

What to do:
1. Write a new DESIGN.md file at the project root summarizing the design system:
   - Typography: Nunito (Google Fonts), font stack.
   - Full color palette: background, foreground, card, primary, secondary, muted, accent, destructive, border, ring, WhatsApp green, Google blue, cream.
   - Exact OKLCH values extracted from src/styles.css.
   - Shadows, radii, and animations (step-in, soft-pulse) with cubic-bezier values.
   - Component copy-paste recipes: primary button, choice button, guide bubble, phone frame, WhatsApp pill, progress bar.
   - Layout rules: mobile-first, max-width 448 px, padding, tap targets.
   - Funnel copy snippets (headlines, offers, CTA text) for reuse.
2. Also write the same file to /mnt/documents/DESIGN.md so it is available in the cloud-backed documents folder and can be previewed/downloaded via the <presentation-artifact> tag.
3. No source code changes to the app itself.

Verification:
- Confirm the file exists in both locations and contains the exact values from src/styles.css and src/components/GrowthFunnel.tsx.
- Provide a brief download link/presentation artifact to the user.
