import { Box } from "lucide-react";
import type { ItemActivity } from "@/types/item";

const activities: ItemActivity[] = [
  {
    id: "1",
    type: "Item Registered",
    itemId: "10023",
    reference: "Record #7a3...9f2e",
    ago: "10 min ago",
    status: "Success",
  },
  {
    id: "2",
    type: "Item Claimed",
    itemId: "10019",
    reference: "Record #9be...d41a",
    ago: "1 hour ago",
    status: "Success",
  },
  {
    id: "3",
    type: "Item Registered",
    itemId: "10022",
    reference: "Record #bc1...7fda",
    ago: "3 hours ago",
    status: "Success",
  },
  {
    id: "4",
    type: "Item Claimed",
    itemId: "10018",
    reference: "Record #11c...aa72",
    ago: "5 hours ago",
    status: "Success",
  },
];

export function RecentTransactions() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">
          Recent Activity
        </h3>

        <button className="text-xs text-primary hover:underline font-medium">
          View All
        </button>
      </div>

      {/* Activity List */}
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-3">

            {/* Icon */}
            <div className="h-9 w-9 rounded-lg bg-primary-soft flex items-center justify-center shrink-0">
              <Box className="h-4 w-4 text-primary" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">

              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-medium">
                  {activity.type}
                </div>
                <div className="text-[11px] text-muted-foreground whitespace-nowrap">
                  {activity.ago}
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Item ID: {activity.itemId}
              </div>

              <div className="flex items-center justify-between mt-0.5">

                <div className="text-[11px] text-muted-foreground font-mono">
                  {activity.reference}
                </div>

                <span className="text-[10px] font-medium text-success bg-success/10 px-1.5 py-0.5 rounded">
                  {activity.status}
                </span>

              </div>

            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}