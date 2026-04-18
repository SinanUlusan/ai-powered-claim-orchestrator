"use client";

import { fetchClaimDashboard } from "@/lib/api/get-claim";
import { useQuery } from "@tanstack/react-query";

export function useClaimDashboard() {
  return useQuery({
    queryKey: ["claim-dashboard"],
    queryFn: ({ signal }) => fetchClaimDashboard(signal),
  });
}
