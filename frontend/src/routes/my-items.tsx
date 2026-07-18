import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { ItemCard } from "@/components/features/items/ItemCard";
import { getItems } from "@/services/itemService";

import React, { useEffect, useState } from "react";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const Route = createFileRoute("/my-items")({
  head: () => ({ meta: [{ title: "My Items — Campus Lost & Found" }] }),
  component: () => (
    <ProtectedRoute>
      <MyItems />
    </ProtectedRoute>
  ),
});

function MyItems() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getItems().then(setItems).catch(console.error);
  }, []);
  return (
    <PageContainer title="My Items" description="Items you have reported.">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.slice(0, 3).map((i) => <ItemCard key={i._id || i.id} item={i} />)}
      </div>
    </PageContainer>
  );
}
