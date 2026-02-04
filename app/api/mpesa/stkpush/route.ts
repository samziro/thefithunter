// import axios from "axios";
// import { NextResponse } from "next/server";

// function getTimestamp() {
//   const now = new Date();
//   return now
//     .toISOString()
//     .replace(/[^0-9]/g, "")
//     .slice(0, 14);
// }

// export async function POST(req) {
//   const { phone, amount, packageId } = await req.json();

//   // 1. Get token
//   const auth = Buffer.from(
//     `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
//   ).toString("base64");

//   const tokenRes = await axios.get(
//     "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
//     {
//       headers: { Authorization: `Basic ${auth}` },
//     }
//   );

//   const token = tokenRes.data.access_token;
//   const timestamp = getTimestamp();
//   const password = Buffer.from(
//     process.env.MPESA_SHORTCODE +
//       process.env.MPESA_PASSKEY +
//       timestamp
//   ).toString("base64");

//   // 2. STK Push
//   const stkRes = await axios.post(
//     "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
//     {
//       BusinessShortCode: process.env.MPESA_SHORTCODE,
//       Password: password,
//       Timestamp: timestamp,
//       TransactionType: "CustomerPayBillOnline",
//       Amount: Number(amount),
//       PartyA: phone,
//       PartyB: process.env.MPESA_SHORTCODE,
//       PhoneNumber: phone,
//       CallBackURL: process.env.MPESA_CALLBACK_URL,
//       AccountReference: packageId,
//       TransactionDesc: "Fitness Package Payment",
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return NextResponse.json(stkRes.data);
// }

// app/api/mpesa/stkpush/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, generatePassword, getTimestamp } from '@/app/lib/mpesa';
import { createClientServer } from '@/app/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { phone, amount, description = 'FIT-HUNTER Watamu Booking' } = await req.json();

    if (!phone || !amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid phone or amount' }, { status: 400 });
    }

    // Clean phone: 2547xxxxxxxx
    let cleanPhone = phone.toString().replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = '254' + cleanPhone.slice(1);
    if (!cleanPhone.startsWith('254')) cleanPhone = '254' + cleanPhone;
    if (cleanPhone.length !== 12) return NextResponse.json({ error: 'Invalid phone format' }, { status: 400 });

    const supabase = createClientServer();
    const timestamp = getTimestamp();
    const password = generatePassword(timestamp);
    const token = await getAccessToken();

    const payload = {
      BusinessShortCode: parseInt(process.env.MPESA_SHORTCODE!),
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: cleanPhone,
      PartyB: parseInt(process.env.MPESA_SHORTCODE!),
      PhoneNumber: cleanPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL!,
      AccountReference: process.env.MPESA_ACCOUNT_REFERENCE!,
      TransactionDesc: description,
    };

    const res = await fetch(`${process.env.MPESA_BASE_URL!}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.ResponseCode !== '0') {
      return NextResponse.json({ error: data.errorMessage || 'STK Push failed' }, { status: 400 });
    }

    // Log to Supabase
    const { error } = await supabase.from('transactions').insert({
      phone: cleanPhone,
      amount,
      checkout_request_id: data.CheckoutRequestID,
      description,
      status: 'pending',
    });

    if (error) console.error('Supabase insert error:', error);

    return NextResponse.json({
      success: true,
      checkoutRequestID: data.CheckoutRequestID,
      message: 'Check your phone for M-PESA PIN prompt!',
    });
  } catch (error) {
    console.error('STK Push error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}