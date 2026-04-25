import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { ItemCard } from "@/components/features/items/ItemCard";
import { recentItems } from "@/services/itemService";

import React, { useEffect, useState } from "react";

export const Route = createFileRoute("/my-items")({
  head: () => ({ meta: [{ title: "My Items — Campus Lost & Found" }] }),
  component: MyItems,
});

function MyItems() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    recentItems().then(setItems).catch(console.error);
  }, []);
  return (
    <PageContainer title="My Items" description="Items you have reported.">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.slice(0, 3).map((i) => <ItemCard key={i._id || i.id} item={i} />)}
      </div>
    </PageContainer>
  );
}
