import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { HeroBanner } from "@/components/features/items/HeroBanner";
import { ItemCard } from "@/components/features/items/ItemCard";
import { HowItWorks } from "@/components/features/items/HowItWorks";
import { SystemOverview } from "@/components/features/items/SystemOverview";
import { RecentTransactions } from "@/components/features/items/RecentTransactions";
import { YourClaims } from "@/components/features/claims/YourClaims";
import { useEffect, useState } from "react";
import { getItems } from "@/services/itemService";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Campus Lost & Found" },
      {
        name: "description",
        content: "Blockchain-based lost and found system for smart campuses.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);

  // ✅ Optional: Protect route (redirect if not logged in)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate({ to: "/login" });
    }
  }, []);

  // ✅ Fetch items
  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("HOME DATA:", data);
        setItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <AppShell>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        
        {/* LEFT SIDE */}
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
              {items.slice(0, 4).map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          </section>

          <HowItWorks />
        </div>

        {/* RIGHT SIDE */}
        <aside className="space-y-6">
          <SystemOverview />
          <RecentTransactions />
          <YourClaims />
        </aside>

      </div>
    </AppShell>
  );
}