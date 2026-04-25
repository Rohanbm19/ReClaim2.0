import { MapPin, Clock, BadgeCheck } from "lucide-react";
import type { FoundItem } from "@/types/item";

export function ItemCard({ item }: { item: FoundItem }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 transition-all duration-200">
      <div className="aspect-square rounded-xl bg-muted/60 flex items-center justify-center overflow-hidden mb-4">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-contain p-3"
        />
      </div>
      <h3 className="font-semibold text-sm">{item.name}</h3>
      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {item.location}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {item.reportedAgo}
        </div>
      </div>
      {item.verified && (
        <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-md">
          <BadgeCheck className="h-3 w-3" />
          Verified
        </span>
      )}
    </div>
  );
}
