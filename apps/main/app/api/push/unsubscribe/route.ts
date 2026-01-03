import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { endpoint } = await request.json();

    // TODO: Remove subscription from database
    console.log("Push unsubscribe for endpoint:", endpoint);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to unsubscribe" },
      { status: 500 },
    );
  }
}
