import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();

    console.log("Verifying:", reference);

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verifyRes.json();
    console.log("Paystack says:", verifyData?.data?.status);

    if (verifyData?.data?.status !== "success") {
      return NextResponse.json({ success: false });
    }

    const { data, error } = await supabase
      .from("clients")
      .update({ status: "active" })
      .eq("payment_reference", reference)
      .select();

    console.log("Updated rows:", data);

    if (error) {
      console.error(error);
      return NextResponse.json({ success: false });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No matching client found",
      });
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}