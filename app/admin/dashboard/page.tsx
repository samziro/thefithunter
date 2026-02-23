"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        const data = await res.json();

        if (data.success) {
          setStats(data.stats);
          setClients(data.clients);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] to-[#121212] text-white py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-slate-400 mt-1">Trainer Control Panel</p>
          </div>
          <Link
            href={"/"}
            className="bg-button px-8 py-3 text-textSecondary font-medium transition-colors flex items-center"
          >
            <i className="ri-arrow-left-line"></i> Back to Home
          </Link>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Clients" value={stats.totalClients} />
          <StatCard label="Active Programs" value={stats.activePrograms} />
          <StatCard label="Monthly Revenue" value={`KES ${stats.monthlyRevenue}`} />
          <StatCard label="Pending Renewals" value={stats.pendingRenewals} />
        </div>

        {/* Clients Table */}
        <div className="bg-[#181818] rounded-2xl p-6 border border-white/5 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Clients</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-white/10">
                <tr>
                  <th className="py-3 text-left">Name</th>
                  <th>Email</th>
                  <th>Program</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>

              <tbody>
                {clients.map((client, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4">{client.full_name}</td>
                    <td>{client.email}</td>
                    <td>{client.package_title}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          client.status === "active"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td>
                      {new Date(client.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ label, value }: any) {
  return (
    <div className="bg-[#181818] rounded-2xl p-6 border border-white/5 shadow-lg">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}