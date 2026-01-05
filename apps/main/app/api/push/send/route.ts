import { NextResponse } from "next/server";
import webPush from "web-push";

// Configure web-push with VAPID keys (lazy initialization)
let vapidInitialized = false;
let vapidInitError: Error | null = null;

function initializeVapid(): void {
  if (vapidInitialized) return;
  if (vapidInitError) throw vapidInitError;

  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
  const vapidEmail = process.env.VAPID_EMAIL || "mailto:your-email@example.com";

  if (vapidPublicKey && vapidPrivateKey) {
    try {
      webPush.setVapidDetails(vapidEmail, vapidPublicKey, vapidPrivateKey);
      vapidInitialized = true;
    } catch (error) {
      vapidInitError =
        error instanceof Error ? error : new Error(String(error));
      throw vapidInitError;
    }
  }
}

export async function POST(request: Request) {
  try {
    const { subscription, payload } = await request.json();

    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

    if (!vapidPublicKey || !vapidPrivateKey) {
      return NextResponse.json(
        { success: false, error: "VAPID keys not configured" },
        { status: 500 },
      );
    }

    // Initialize VAPID keys only when route is called
    try {
      initializeVapid();
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Invalid VAPID keys configuration" },
        { status: 500 },
      );
    }

    if (!subscription) {
      return NextResponse.json(
        { success: false, error: "Subscription required" },
        { status: 400 },
      );
    }

    // Send push notification
    await webPush.sendNotification(subscription, JSON.stringify(payload));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send push notification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send push notification" },
      { status: 500 },
    );
  }
}
