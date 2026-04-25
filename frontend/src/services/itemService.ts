import type { FoundItem } from "@/types/item";
import airpods from "@/assets/item-airpods.jpg";
import wallet from "@/assets/item-wallet.jpg";
import backpack from "@/assets/item-backpack.jpg";
import bottle from "@/assets/item-bottle.jpg";

export const recentItems: FoundItem[] = [
  { id: "1", name: "Apple AirPods Pro", location: "Library, Block A", reportedAgo: "2 hours ago", image: airpods, verified: true, category: "Electronics" },
  { id: "2", name: "Leather Wallet", location: "Cafeteria", reportedAgo: "5 hours ago", image: wallet, verified: true, category: "Accessories" },
  { id: "3", name: "HP Backpack", location: "Ground Floor", reportedAgo: "1 day ago", image: backpack, verified: true, category: "Bags" },
  { id: "4", name: "Nike Water Bottle", location: "Sports Complex", reportedAgo: "1 day ago", image: bottle, verified: true, category: "Sports" },
];