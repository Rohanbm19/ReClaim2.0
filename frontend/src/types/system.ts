export type ItemStatus = "found" | "returned" | "pending";

export type SystemItem = {
  id: string;
  status: ItemStatus;
  ownerId?: string; // for user filtering later
};