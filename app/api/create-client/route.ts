import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      nation,
      age,
      goals,
      packageTitle,
      packagePrice,
      reference,
    } = body;

    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          nation,
          age: Number(age),
          goals,
          package_title: packageTitle,
          package_price: Number(packagePrice),
          status: "pending_payment",
          payment_reference: reference,
        },
      ])
      .select(); // important to return inserted row

    if (error) {
      console.error("🔥 SUPABASE ERROR:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log("✅ Inserted:", data);

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("🔥 ROUTE ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}