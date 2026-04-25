import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { ItemCard } from "@/components/features/items/ItemCard";
import { useEffect, useState } from "react";
import { getItems } from "@/services/itemService";

export const Route = createFileRoute("/browse")({
  component: Browse,
});

function Browse() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("API DATA:", data);
        setItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <PageContainer title="Browse Items">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
         <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </PageContainer>
  );
}