import { FileText, ShieldCheck, UserCheck, QrCode, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  { icon: FileText, label: "Finder reports the item" },
  { icon: ShieldCheck, label: "Admin verifies & records on blockchain" },
  { icon: UserCheck, label: "Owner claims by answering questions" },
  { icon: QrCode, label: "OTP/QR verification for authenticity" },
  { icon: CheckCircle2, label: "Item returned & record updated" },
];

export function HowItWorks() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-semibold text-base mb-6">How It Works</h2>
      <div className="flex items-start gap-2 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-2 shrink-0">
            <div className="flex flex-col items-center w-32">
              <div className="h-14 w-14 rounded-full bg-primary-soft flex items-center justify-center mb-3">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex items-start gap-1.5 text-xs text-foreground/80 text-left leading-snug">
                <span className="font-semibold text-primary">{i + 1}</span>
                <span>{step.label}</span>
              </div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground/60 mt-5 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
