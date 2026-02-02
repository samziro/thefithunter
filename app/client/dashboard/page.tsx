'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const auth = localStorage.getItem('clientAuth');
      const clientEmail = localStorage.getItem('clientEmail');
      if (!auth) {
        router.push('/login');
        return;
      }
      setEmail(clientEmail);
    } catch {
      router.push('/login');
      return;
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-bg py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-4">Client Dashboard</h1>
        <p className="text-textSecondary mb-6">Welcome back{email ? `, ${email}` : ''}.</p>

        <section className="bg-lightBg rounded-2xl p-6 shadow mb-6">
          <h2 className="font-semibold mb-3">Purchased Programs</h2>
          <p className="text-sm text-textSecondary">Programs you purchased will appear here after integration.</p>
        </section>

        <section className="bg-lightBg rounded-2xl p-6 shadow">
          <h2 className="font-semibold mb-4">Client Features (for Paid Clients)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-sm text-textSecondary border-b">
                  <th className="py-3 pr-4">Feature Category</th>
                  <th className="py-3 pr-4">Key Elements</th>
                  <th className="py-3 pr-4">Why Essential</th>
                  <th className="py-3 py-3">Examples</th>
                </tr>
              </thead>
              <tbody className="text-sm text-textMain">
                <tr className="border-b">
                  <td className="py-3 pr-4 align-top">Progress Tracking</td>
                  <td className="py-3 pr-4 align-top">Graphs, stats, achievements</td>
                  <td className="py-3 pr-4 align-top">Motivates continued use of purchased programs</td>
                  <td className="py-3 align-top">Trainerize &quot;My Progress&quot;, TrueCoach compliance views</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4 align-top">Program Access</td>
                  <td className="py-3 pr-4 align-top">List of bought packages, session counts</td>
                  <td className="py-3 pr-4 align-top">Quick view of value received</td>
                  <td className="py-3 align-top">Hevy Coach program overview, FitSW client dashboard</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4 align-top">Workout Tools</td>
                  <td className="py-3 pr-4 align-top">Logging, calendar, assignments</td>
                  <td className="py-3 pr-4 align-top">Enables active participation in paid content</td>
                  <td className="py-3 align-top">WeStrive workout calendar, Exercise.com logging</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4 align-top">Communication</td>
                  <td className="py-3 pr-4 align-top">Messaging, notifications</td>
                  <td className="py-3 pr-4 align-top">Builds relationship, clarifies program details</td>
                  <td className="py-3 align-top">TrueCoach chat, PT Distinction messaging</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 align-top">Account / Payment</td>
                  <td className="py-3 pr-4 align-top">Purchase history, remaining sessions</td>
                  <td className="py-3 pr-4 align-top">Transparency on investment</td>
                  <td className="py-3 align-top">My PT Hub billing view, Everfit payment tracking</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}