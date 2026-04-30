import heroImg from "@/assets/hero-shield.png";
import { Link } from "@tanstack/react-router";

export function HeroBanner() {
  return (
    <section
      className="rounded-2xl p-8 lg:p-10 relative overflow-hidden border border-border"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="grid lg:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
            Secure. Transparent. Trustworthy.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            A blockchain-based lost &amp; found system for smart campuses.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/report" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-[var(--shadow-elevated)] hover:opacity-90 transition-opacity inline-flex items-center justify-center">
              Report Found Item
            </Link>
            <Link to="/dashboard" className="px-5 py-2.5 rounded-xl bg-card border border-border text-sm font-medium hover:bg-muted transition-colors inline-flex items-center justify-center">
              Browse Items
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex justify-end">
          <img
            src={heroImg}
            alt="Blockchain secured lost and found"
            className="h-56 w-auto object-contain"
            width={384}
            height={320}
          />
        </div>
      </div>
    </section>
  );
}