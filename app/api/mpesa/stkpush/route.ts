import axios from "axios";
import { NextResponse } from "next/server";

function getTimestamp() {
  const now = new Date();
  return now
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
}

export async function POST(req) {
  const { phone, amount, packageId } = await req.json();

  // 1. Get token
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const tokenRes = await axios.get(
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: { Authorization: `Basic ${auth}` },
    }
  );

  const token = tokenRes.data.access_token;
  const timestamp = getTimestamp();
  const password = Buffer.from(
    process.env.MPESA_SHORTCODE +
      process.env.MPESA_PASSKEY +
      timestamp
  ).toString("base64");

  // 2. STK Push
  const stkRes = await axios.post(
    "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Number(amount),
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: packageId,
      TransactionDesc: "Fitness Package Payment",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return NextResponse.json(stkRes.data);
}
