import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: clients, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message });
    }

    const totalClients = clients.length;

    const activeClients = clients.filter(
      (c) => c.status === "active" || c.status === "pending_payment"
    );

    const totalRevenue = clients
      .filter((c) => c.status === "active")
      .reduce((sum, c) => sum + (c.package_price || 0), 0);

    return NextResponse.json({
      success: true,
      stats: {
        totalClients,
        activePrograms: 4, // you can later make this dynamic
        monthlyRevenue: totalRevenue,
        pendingRenewals: clients.filter((c) => c.status === "expired").length,
      },
      clients,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}