import { NextResponse } from "next/server";
import { mockCartData } from "@/lib/mockCartData";

export async function GET() {
  return NextResponse.json(mockCartData);
}
