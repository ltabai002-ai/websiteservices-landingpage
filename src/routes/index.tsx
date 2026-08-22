import { createFileRoute } from "@tanstack/react-router";
import GrowthFunnel from "@/components/GrowthFunnel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "₹99 Website for Your Business | 360° Growth Partner" },
      {
        name: "description",
        content:
          "Get a simple website linked to your Google Business Profile for ₹99/month. Customers see your services and reach you instantly on WhatsApp or call.",
      },
      { property: "og:title", content: "A Website for Your Business — Just ₹99" },
      {
        property: "og:description",
        content:
          "We build it first, you pay only when you're happy. Live within 24 hours, with one-click WhatsApp for your customers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <GrowthFunnel />;
}
