import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { Bell, CheckCircle2, AlertCircle } from "lucide-react";

const notifs = [
  { icon: CheckCircle2, color: "text-success", title: "Claim Approved", desc: "Your claim for HP Backpack has been approved.", ago: "10 min ago" },
  { icon: Bell, color: "text-primary", title: "New Match Found", desc: "An item matching your description was reported.", ago: "1 hour ago" },
  { icon: AlertCircle, color: "text-warning", title: "Verification Pending", desc: "Please complete OTP verification for CLM1018.", ago: "3 hours ago" },
];

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Campus Lost & Found" }] }),
  component: Notifications,
});

function Notifications() {
  return (
    <PageContainer title="Notifications">
      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {notifs.map((n, i) => (
          <div key={i} className="flex items-start gap-3 p-4">
            <n.icon className={`h-5 w-5 mt-0.5 ${n.color}`} />
            <div className="flex-1">
              <div className="text-sm font-medium">{n.title}</div>
              <div className="text-xs text-muted-foreground">{n.desc}</div>
            </div>
            <div className="text-[11px] text-muted-foreground whitespace-nowrap">{n.ago}</div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
