import { NextResponse } from "next/server";
import claimData from "@/lib/claim-data.json";

export async function GET() {
  // Tiny delay simulates network while staying well under the case-study responsiveness target.
  await new Promise((r) => setTimeout(r, 80));
  return NextResponse.json(claimData);
}
