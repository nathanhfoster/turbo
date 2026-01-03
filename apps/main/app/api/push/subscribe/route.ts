import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const subscription = await request.json();

    // TODO: Store subscription in database
    console.log("Push subscription received:", subscription);

    return NextResponse.json({ success: true, subscription });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process subscription" },
      { status: 500 },
    );
  }
}
