import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { QrCode } from "lucide-react";
import backpack from "@/assets/item-backpack.jpg";
import wallet from "@/assets/item-wallet.jpg";

const claims = [
  { id: "CLM1021", name: "HP Backpack", img: backpack, status: "Approved" as const },
  { id: "CLM1018", name: "Leather Wallet", img: wallet, status: "Pending" as const },
];

const statusColor: Record<string, string> = {
  Approved: "text-success bg-success/10",
  Pending: "text-warning bg-warning/10",
  Rejected: "text-destructive bg-destructive/10",
};

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const Route = createFileRoute("/my-claims")({
  head: () => ({ meta: [{ title: "My Claims — Campus Lost & Found" }] }),
  component: () => (
    <ProtectedRoute>
      <MyClaims />
    </ProtectedRoute>
  ),
});

function MyClaims() {
  return (
    <PageContainer title="My Claims" description="Track the status of your submitted claims.">
      <div className="space-y-3">
        {claims.map((c) => (
          <div key={c.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
            <img src={c.img} alt={c.name} className="h-14 w-14 rounded-lg object-contain bg-muted/60 p-1" loading="lazy" />
            <div className="flex-1">
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-muted-foreground">Claim ID: {c.id}</div>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-md ${statusColor[c.status]}`}>{c.status}</span>
            
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
