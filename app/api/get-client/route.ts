// app/api/get-client/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // ⚠️ For now, temporarily fetch the latest client
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(); // 👈 IMPORTANT

    if (error) {
      return NextResponse.json({ success: false, error: error.message });
    }

    if (!data) {
      return NextResponse.json({ success: false, error: "No client found" });
    }

    return NextResponse.json({ success: true, client: data });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}