import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { ItemCard } from "@/components/features/items/ItemCard";
import { recentItems } from "@/services/itemService";

export const Route = createFileRoute("/browse")({
  head: () => ({ meta: [{ title: "Browse Items — Campus Lost & Found" }] }),
  component: Browse,
});

function Browse() {
  const all = [...recentItems, ...recentItems];
  return (
    <PageContainer title="Browse Items" description="All items currently registered on the blockchain.">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {all.map((item, i) => (
          <ItemCard key={i} item={item} />
        ))}
      </div>
    </PageContainer>
  );
}