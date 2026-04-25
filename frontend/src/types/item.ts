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

export interface BlockchainTx {
  id: string;
  type: "Item Registered" | "Item Claimed" | "Item Returned";
  itemId: string;
  txHash: string;
  ago: string;
  status: "Success" | "Pending";
}
