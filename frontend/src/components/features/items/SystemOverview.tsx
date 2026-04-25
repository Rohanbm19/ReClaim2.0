import type { SystemItem } from "@/types/system";

type Props = {
  items: SystemItem[];
  role: "user" | "admin";
};

export function SystemOverview({ items, role }: Props) {
  // 🔥 Dynamic calculations (NO HARD CODE)

  const totalItems = items.length;

  const returnedItems = items.filter(
    (i) => i.status === "returned"
  ).length;

  const pendingItems = items.filter(
    (i) => i.status === "pending"
  ).length;

  const foundItems = items.filter(
    (i) => i.status === "found"
  ).length;

  // 🔐 Role-based stats
  const stats =
    role === "admin"
      ? [
          {
            label: "Total Items in System",
            value: totalItems,
            color: "text-primary",
          },
          {
            label: "Items Found",
            value: foundItems,
            color: "text-primary",
          },
          {
            label: "Items Returned",
            value: returnedItems,
            color: "text-success",
          },
          {
            label: "Pending Verification",
            value: pendingItems,
            color: "text-warning",
          },
        ]
      : [
          {
            label: "Your Items",
            value: totalItems,
            color: "text-primary",
          },
          {
            label: "Your Returned Items",
            value: returnedItems,
            color: "text-success",
          },
          {
            label: "Your Pending Claims",
            value: pendingItems,
            color: "text-warning",
          },
        ];

  return (
    <div className="rounded-2xl border border-border bg-card p-5">

      <h3 className="font-semibold text-sm mb-4">
        System Overview {role === "admin" ? "(Admin)" : "(User)"}
      </h3>

      <ul className="divide-y divide-border">
        {stats.map((s) => (
          <li
            key={s.label}
            className="flex items-center justify-between py-3 text-sm"
          >
            <span className="text-muted-foreground">{s.label}</span>
            <span className={`font-bold text-base ${s.color}`}>
              {s.value}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
}