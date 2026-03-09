import { headers } from "next/headers";
import { mockCartData } from "./mockCartData";

export async function fetchCart() {
  try {
    const headerList = await headers();
    const host = headerList.get("x-forwarded-host") || headerList.get("host");
    const protocol = headerList.get("x-forwarded-proto") || "http";

    if (!host) {
      return mockCartData;
    }

    const response = await fetch(`${protocol}://${host}/api/cart`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Could not fetch cart");
    }

    return response.json();
  } catch {
    return mockCartData;
  }
}
