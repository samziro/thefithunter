// app/lib/mpesa.ts
import { cookies } from 'next/headers';

const SHORTCODE = process.env.MPESA_SHORTCODE!;
const PASSKEY = process.env.MPESA_PASSKEY!;
const BASE_URL = process.env.MPESA_BASE_URL!;

export async function getAccessToken() {
  // Check cache first (1hr expiry)
  const tokenCookie = (await cookies()).get('mpesa_token')?.value;
  if (tokenCookie) return tokenCookie;

  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY!}:${process.env.MPESA_CONSUMER_SECRET!}`).toString('base64');
  
  const res = await fetch(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  
  if (!res.ok) throw new Error(`Token failed: ${res.status}`);
  const { access_token } = await res.json();
  
  // Cache for 50min
  (await cookies()).set('mpesa_token', access_token, { maxAge: 50 * 60 });
  return access_token;
}

export function generatePassword(timestamp: string) {
  return Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString('base64');
}

export function getTimestamp() {
  return new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
}