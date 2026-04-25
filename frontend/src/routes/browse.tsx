import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { ItemCard } from "@/components/features/items/ItemCard";

export const Route = createFileRoute("/browse")({
  component: Browse,
});

const mockItems = [
  {
    id: "1",
    name: "Black Wallet",
    location: "Library",
    reportedAgo: "2 hours ago",
  },
  {
    id: "2",
    name: "Red Bag",
    location: "Cafeteria",
    reportedAgo: "1 day ago",
  },
];

function Browse() {
  return (
    <PageContainer
      title="Browse Items"
      description="Lost & Found Items"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mockItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </PageContainer>
  );
}