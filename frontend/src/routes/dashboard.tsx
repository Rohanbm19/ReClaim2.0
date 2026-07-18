import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/layout/AppShell";
import { HeroBanner } from "@/components/features/items/HeroBanner";
import { ItemCard } from "@/components/features/items/ItemCard";
import { HowItWorks } from "@/components/features/items/HowItWorks";
import { SystemOverview } from "@/components/features/items/SystemOverview";

// ✅ CHANGED HERE
import { getItems } from "@/services/itemService";

import { mockSystemItems } from "@/services/mockData";

import React, { useEffect, useState } from "react";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
});

function Dashboard() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // ✅ CHANGED HERE
    getItems().then(setItems).catch(console.error);
  }, []);

  return (
    <AppShell>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-6 min-w-0">
          <HeroBanner />

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-base">
                Recently Found Items
              </h2>

              <button className="text-xs text-primary hover:underline font-medium">
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((item) => (
                <ItemCard key={item._id || item.id} item={item} />
              ))}
            </div>
          </section>

          <HowItWorks />
        </div>

        <aside className="space-y-6">
          <SystemOverview
            items={mockSystemItems}
            role="admin"
          />
        </aside>
      </div>
    </AppShell>
  );
}