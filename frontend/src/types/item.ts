export interface FoundItem {
  id: string;
  name: string;
  location: string;
  reportedAgo: string;
  image: string;
  verified: boolean;
  category?: string;
}

export interface Claim {
  id: string;
  itemName: string;
  itemImage: string;
  status: "Pending" | "Approved" | "Rejected";
}

export type ItemActivity = {
  id: string;
  type: "Item Registered" | "Item Claimed";
  itemId: string;
  reference: string;
  ago: string;
  status: "Success" | "Pending" | "Failed";
};