import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";

const faqs = [
  { q: "How does the blockchain verification work?", a: "Every reported item is hashed and stored on-chain, providing a tamper-proof record of ownership and claim history." },
  { q: "What if I lose my QR code?", a: "You can regenerate it from My Claims at any time. The OTP verification adds an extra layer of security." },
  { q: "How long does claim approval take?", a: "Most claims are reviewed within 24 hours by our admin team." },
];

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help & Support — Campus Lost & Found" }] }),
  component: Help,
});

function Help() {
  return (
    <PageContainer title="Help & Support" description="Frequently asked questions.">
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="rounded-2xl border border-border bg-card p-5 group">
            <summary className="cursor-pointer font-medium text-sm list-none flex items-center justify-between">
              {f.q}
              <span className="text-primary group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </PageContainer>
  );
}
