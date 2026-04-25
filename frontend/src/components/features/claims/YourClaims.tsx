import { QrCode } from "lucide-react";
import backpack from "@/assets/item-backpack.jpg";

export function YourClaims() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Your Claims</h3>
        <button className="text-xs text-primary hover:underline font-medium">View All</button>
      </div>
      <div className="flex items-center gap-3">
        <img src={backpack} alt="HP Backpack" className="h-14 w-14 rounded-lg object-contain bg-muted/60 p-1" width={56} height={56} loading="lazy" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold">HP Backpack</div>
          <div className="text-xs text-muted-foreground">Claim ID: CLM1021</div>
          <div className="text-xs">
            Status: <span className="text-success font-medium">Approved</span>
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
          <QrCode className="h-3.5 w-3.5" /> View QR
        </button>
      </div>
    </div>
  );
}
