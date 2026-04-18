import { claimDashboardSchema, type ClaimDashboard } from "@/lib/schemas/claim";

export const FETCH_CLAIM_FAILED = "FETCH_CLAIM_FAILED";

/** Fetches claim JSON from the Next.js route; keeps latency low for the &lt;3s UX goal. */
export async function fetchClaimDashboard(signal?: AbortSignal): Promise<ClaimDashboard> {
  const res = await fetch("/api/claim", { signal, cache: "no-store" });
  if (!res.ok) {
    throw new Error(FETCH_CLAIM_FAILED);
  }
  const json: unknown = await res.json();
  return claimDashboardSchema.parse(json);
}
