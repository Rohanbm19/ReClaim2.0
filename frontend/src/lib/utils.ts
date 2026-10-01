import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiBaseUrl() {
  const configuredUrl = (import.meta.env.VITE_API_URL ?? "").trim().replace(/\/+$/, "");

  return configuredUrl || "http://localhost:5000";
}

export function getClerkPublishableKey() {
  return (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? "").trim();
}
