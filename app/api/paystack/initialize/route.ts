import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const Paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone, packageTitle, priceKES } = body;

    if (!email || !packageTitle || typeof priceKES !== 'number' || priceKES <= 0) {
      return NextResponse.json({ error: 'Invalid or missing fields' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    // 1. Create pending order (adjust table/columns to your schema)
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_email: email,
        package_name: packageTitle,
        package_price_kes: priceKES,
        status: 'pending',
        phone: phone || null,
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (orderError || !order?.id) {
      console.error('Order creation failed:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // 2. Initialize Paystack transaction
    const transaction = await Paystack.transaction.initialize({
      email,
      amount: priceKES * 100, // Paystack uses smallest unit (kobo)
      reference: order.id,     // use Supabase UUID as reference
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
      metadata: {
        package: packageTitle,
        phone,
        order_id: order.id,
      },
    });

    if (!transaction.status) {
      throw new Error(transaction.message || 'Paystack initialization failed');
    }

    return NextResponse.json({
      success: true,
      authorization_url: transaction.data.authorization_url,
      reference: transaction.data.reference,
      orderId: order.id,
    });
  } catch (err: any) {
    console.error('Initialize error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}