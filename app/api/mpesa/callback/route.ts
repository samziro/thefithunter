import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {
  const body = await req.json();

  console.log("MPESA CALLBACK:", JSON.stringify(body, null, 2));

  const callback = body?.Body?.stkCallback;

  if (!callback) {
    return NextResponse.json({ error: "Invalid callback" }, { status: 400 });
  }

  const { ResultCode, CheckoutRequestID, CallbackMetadata } = callback;

  // ❌ Payment failed
  if (ResultCode !== 0) {
    await supabase.from("payments").update({
      status: "FAILED",
    }).eq("checkout_request_id", CheckoutRequestID);

    return NextResponse.json({ success: false });
  }

  // ✅ Payment successful
  const items = CallbackMetadata.Item;

  const amount = items.find((i: any) => i.Name === "Amount")?.Value;
  const receipt = items.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value;
  const phone = items.find((i: any) => i.Name === "PhoneNumber")?.Value;

  const startDate = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(startDate.getDate() + 30);

  // 1️⃣ Save payment
  await supabase.from("payments").insert({
    phone,
    amount,
    receipt,
    checkout_request_id: CheckoutRequestID,
    status: "PAID",
  });

  // 2️⃣ Unlock fitness package (30 days)
  await supabase.from("user_packages").insert({
    phone,
    package: "FITNESS-GOLD",
    starts_at: startDate.toISOString(),
    expires_at: expiryDate.toISOString(),
  });

  return NextResponse.json({ success: true });
}
