import { MapPin, Clock, BadgeCheck } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function ItemCard({ item }: { item: any }) {
  const navigate = useNavigate();

  const name = item.itemName || item.name || item.title;
  const location = item.location || item.locationFound;
  const image = item.image || "https://via.placeholder.com/150";
  const reportedAgo = item.reportedAgo || "Recently";
  const verified = item.verified ?? true;

  return (
    <div
      onClick={() => navigate({ to: `/item/${item._id || item.id}` })}
      className="cursor-pointer rounded-2xl border border-border bg-card p-4 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 transition-all"
    >
      <div className="aspect-square rounded-xl bg-muted/60 flex items-center justify-center overflow-hidden mb-4">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain p-3"
        />
      </div>

      <h3 className="font-semibold text-sm">{name}</h3>

      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {location}
        </div>

        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {reportedAgo}
        </div>
      </div>

      {verified && (
        <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-md">
          <BadgeCheck className="h-3 w-3" />
          Verified
        </span>
      )}
    </div>
  );
}