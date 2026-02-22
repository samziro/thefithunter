import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { reference } = await req.json();

  if (!reference) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (data?.data?.status === "success") {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 400 });
}