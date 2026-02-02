'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Booking {
  id: string;
  customerName: string;
  phone: string;
  location: string;
  program: string;
  quantity: number;
  totalAmount: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed';
  bookingDate: string;
  notificationSent: boolean;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
  const [sendingNotificationId, setSendingNotificationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch bookings from Supabase
  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('bookingDate', { ascending: false });

      if (error) {
        setError('Failed to load bookings. Please try again.');
        setBookings([]);
      } else {
        setBookings(data || []);
      }
      setLoading(false);
    };

    loadBookings();

    // Auto-refresh every 15 seconds
    const interval = setInterval(loadBookings, 15000);
    return () => clearInterval(interval);
  }, []);

  // Send notification via WhatsApp or SMS, then mark as notified
  const sendNotification = async (booking: Booking, channel: 'whatsapp' | 'sms') => {
    if (sendingNotificationId) return;

    setSendingNotificationId(booking.id);
    try {
      const message = `Hi ${booking.customerName}, your booking for ${booking.quantity} × ${booking.program} (KES ${booking.totalAmount}) has been ${booking.status}. Thank you for choosing Fit Hunter!`;

      const encoded = encodeURIComponent(message);
      const phone = formatPhoneForWhatsApp(booking.phone);

      if (channel === 'whatsapp') {
        window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
      } else {
        window.open(`sms:${booking.phone}?body=${encoded}`, '_blank');
      }

      // Optimistically mark as sent
      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? { ...b, notificationSent: true } : b))
      );

      // Call API to persist (fire-and-forget for better UX)
      fetch('/api/admin/mark-notified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: booking.id }),
      }).catch(console.error);
    } catch {
      setError('Failed to open messaging app.');
    } finally {
      setSendingNotificationId(null);
    }
  };

  const formatPhoneForWhatsApp = (phone: string): string => {
    let cleaned = phone.replace(/[\s+-]/g, '');
    if (cleaned.startsWith('0')) cleaned = '254' + cleaned.slice(1);
    if (cleaned.startsWith('254') && cleaned.length === 12) return cleaned;
    if (/^\d{9,10}$/.test(cleaned)) return '254' + cleaned.replace(/^7/, '7');
    return cleaned;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const filteredBookings = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  // Stats
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const newPendingCount = bookings.filter((b) => b.status === 'pending' && !b.notificationSent).length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="min-h-dvh bg-[#292929] py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white ">
              Booking Dashboard
            </h1>
            <p className="text-slate-300 mt-2 ">Real-time overview of all client bookings</p>
          </div>
          <Link
            href="/"
            className="bg-yellow-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-700 transition-colors "
          >
            ← Back to Website
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#4a4a4a] rounded-xl shadow-lg p-6 border border-yellow-600/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm ">Total Bookings</p>
                <p className="text-3xl font-bold text-white mt-1 ">{totalBookings}</p>
              </div>
              <i className="ri-calendar-check-line text-yellow-500 text-3xl" />
            </div>
          </div>

          <div className="bg-[#4a4a4a] rounded-xl shadow-lg p-6 border border-yellow-600/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm ">Awaiting Payment</p>
                <p className="text-3xl font-bold text-white mt-1 ">{pendingCount}</p>
              </div>
              <i className="ri-time-line text-yellow-500 text-3xl" />
            </div>
          </div>

          <div className="bg-[#4a4a4a] rounded-xl shadow-lg p-6 border border-yellow-600/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm ">Paid & Confirmed</p>
                <p className="text-3xl font-bold text-white mt-1 ">{confirmedCount}</p>
              </div>
              <i className="ri-checkbox-circle-line text-blue-500 text-3xl" />
            </div>
          </div>

          <div className="bg-[#4a4a4a] rounded-xl shadow-lg p-6 border border-yellow-600/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm ">Total Revenue</p>
                <p className="text-3xl font-bold text-white mt-1 ">
                  KSh {totalRevenue.toLocaleString()}
                </p>
              </div>
              <i className="ri-money-dollar-circle-line text-green-500 text-3xl" />
            </div>
          </div>
        </div>

        {/* New Bookings Alert */}
        {newPendingCount > 0 && (
          <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-xl p-5 mb-8 flex items-center gap-4">
            <i className="ri-notification-3-line text-yellow-500 text-2xl animate-pulse" />
            <div>
              <p className="font-semibold text-yellow-300">New bookings!</p>
              <p className="text-yellow-200">
                {newPendingCount} client{newPendingCount > 1 ? 's have' : ' has'} booked and is awaiting confirmation.
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-red-900/30 border border-red-600/50 rounded-xl p-5 mb-8 flex items-center gap-4">
            <i className="ri-error-warning-line text-red-400 text-xl" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(['all', 'pending', 'confirmed', 'completed'] as const).map((status) => {
            const count =
              status === 'all'
                ? totalBookings
                : status === 'pending'
                ? pendingCount
                : status === 'confirmed'
                ? confirmedCount
                : bookings.filter((b) => b.status === 'completed').length;

            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-3 rounded-xl font-medium transition-colors  ${
                  filter === status
                    ? 'bg-yellow-600 text-white shadow-lg'
                    : 'bg-[#4a4a4a] text-slate-300 hover:bg-[#5a5a5a]'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
              </button>
            );
          })}
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-20 bg-[#4a4a4a] rounded-2xl">
            <i className="ri-inbox-line text-6xl text-slate-600 mb-4" />
            <p className="text-xl text-slate-400 ">No bookings found for this filter.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#4a4a4a] rounded-2xl shadow-xl p-6 md:p-8 border border-slate-700"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <h3 className="text-xl font-bold text-white ">
                        Booking #{booking.id.slice(0, 8)}
                      </h3>
                      <span className={`px-4 py-1 rounded-full text-sm font-medium border ${getStatusBadge(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      {booking.notificationSent ? (
                        <span className="px-4 py-1 bg-green-900/50 text-green-300 rounded-full text-sm font-medium border border-green-700">
                          Notified
                        </span>
                      ) : booking.status === 'pending' ? (
                        <span className="px-4 py-1 bg-red-900/50 text-red-300 rounded-full text-sm font-medium animate-pulse border border-red-700">
                          New
                        </span>
                      ) : null}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                      <div>
                        <p className="text-slate-400 font-medium">Client</p>
                        <p className="text-white ">{booking.customerName}</p>
                        <p className="text-slate-300">{booking.phone}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium">Program</p>
                        <p className="text-white ">
                          {booking.quantity} × {booking.program}
                        </p>
                        <p className="text-lg font-bold text-yellow-500 mt-1">
                          KSh {booking.totalAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium">Location</p>
                        <p className="text-white ">{booking.location || 'Client choice'}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium">Booked On</p>
                        <p className="text-white ">{formatDate(booking.bookingDate)}</p>
                      </div>
                      {booking.notes && (
                        <div className="md:col-span-2">
                          <p className="text-slate-400 font-medium">Notes</p>
                          <p className="text-white  italic">{booking.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 lg:w-64">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => sendNotification(booking, 'whatsapp')}
                        disabled={booking.notificationSent || sendingNotificationId === booking.id}
                        className="px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition  flex items-center justify-center gap-2"
                      >
                        <i className="ri-whatsapp-line text-lg" />
                        {sendingNotificationId === booking.id ? 'Opening...' : 'WhatsApp'}
                      </button>
                      <button
                        onClick={() => sendNotification(booking, 'sms')}
                        disabled={booking.notificationSent || sendingNotificationId === booking.id}
                        className="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition  flex items-center justify-center gap-2"
                      >
                        <i className="ri-message-3-line text-lg" />
                        SMS
                      </button>
                    </div>
                    <a
                      href={`tel:${booking.phone}`}
                      className="px-4 py-3 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-yellow-700 transition text-center  flex items-center justify-center gap-2"
                    >
                      <i className="ri-phone-line" />
                      Call Client
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}