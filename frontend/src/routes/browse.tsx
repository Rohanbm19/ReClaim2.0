import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { ItemCard } from "@/components/features/items/ItemCard";
import { getItems } from "../services/itemService";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const Route = createFileRoute("/browse")({
  component: () => (
    <ProtectedRoute>
      <Browse />
    </ProtectedRoute>
  ),
});

function Browse() {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    fetchItems();
  }, []);

  // 🔍 Filter + Search Logic
  const filteredItems = items.filter((item) => {
    const itemName = item.name || item.itemName || item.title || "";
    const matchesSearch = itemName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "verified"
        ? item.verified
        : !item.verified;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Browse Items</h1>
        <p className="text-sm text-muted-foreground">
          Find and claim your lost belongings securely.
        </p>
      </div>

      {/* 🔍 SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {["all", "verified", "pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* 📦 ITEMS GRID */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        // ❌ EMPTY STATE
        <div className="text-center py-16 border border-dashed border-border rounded-2xl">
          <p className="text-lg font-medium">No items found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}