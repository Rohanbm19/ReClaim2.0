const stats = [
  { label: "Total Items Found", value: 128, color: "text-primary" },
  { label: "Items Returned", value: 87, color: "text-success" },
  { label: "Pending Claims", value: 41, color: "text-warning" },
];

export function SystemOverview() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-semibold text-sm mb-4">System Overview</h3>
      <ul className="divide-y divide-border">
        {stats.map((s) => (
          <li key={s.label} className="flex items-center justify-between py-3 text-sm">
            <span className="text-muted-foreground">{s.label}</span>
            <span className={`font-bold text-base ${s.color}`}>{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
