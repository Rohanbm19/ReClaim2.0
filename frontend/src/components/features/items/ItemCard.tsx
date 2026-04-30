import { useNavigate } from "@tanstack/react-router";

export function ItemCard({ item }: { item: any }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate({
          to: "/item/$id",
          params: { id: item._id || item.id },
        })
      }
      className="border p-4 cursor-pointer"
    >
      <h3>{item.name || item.itemName || item.title || "Unknown Item"}</h3>
      <p>{item.location || item.locationFound || "Unknown Location"}</p>
      <p className="text-xs text-muted-foreground">
  {item.createdBy === "admin" ? "Verified by Admin" : "Reported by User"}
</p>
    </div>
  );
}