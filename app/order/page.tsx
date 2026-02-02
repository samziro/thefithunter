'use client';

import { useState } from 'react';

export default function PaymentForm({ account }: { account: string }) {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const isValidPhone = (phone: string) =>
    /^254(7|1)\d{8}$/.test(phone.replace(/\s+/g, ''));

  const handlePayment = async () => {
    const cleanedPhone = phone.replace(/\s+/g, '');

    if (!isValidPhone(cleanedPhone)) {
      alert('Please enter a valid Kenyan phone number starting with 2547... or 2541... (e.g., 254712345678)');
      return;
    }

    if (!amount || amount <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanedPhone,
          amount: Number(amount),
          account, // e.g., FITNESS-GOLD
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data?.error || 'Payment initiation failed. Please try again.');
        return;
      }

      alert('STK Push sent successfully! Check your phone to complete the payment 📱');
      // Optional: reset form after success
      setPhone('');
      setAmount('');
    } catch {
      alert('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-dvh bg-bg '>
      <div className="space-y-6 max-w-sm mx-auto flex-col items-center justify-center">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-200 mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="254712345678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 bg-[#292929] border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/30 transition"
          required
        />
        <p className="mt-1 text-xs text-slate-400">Format: 254 followed by 9 digits (no spaces needed)</p>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-slate-200 mb-1">
          Amount (KES)
        </label>
        <input
          id="amount"
          type="number"
          min="1"
          placeholder="2000"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === '' ? '' : Number(e.target.value))
          }
          className="w-full px-4 py-3 bg-[#292929] border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/30 transition"
          required
        />
      </div>

      <button
        onClick={handlePayment}
        disabled={loading || !phone || !amount}
        className="w-full px-6 py-4 bg-button text-white rounded-md font-semibold hover:bg-buttonHover disabled:opacity-60 disabled:cursor-not-allowed transition font-poppins flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <i className="ri-loader-4-line animate-spin"></i>
            Processing…
          </>
        ) : (
          'Pay with M-Pesa'
        )}
      </button>

      {loading && (
        <p className="text-center text-sm text-slate-300">
          Waiting for you to enter PIN on your phone...
        </p>
      )}
    </div>
    </div>
  );
}