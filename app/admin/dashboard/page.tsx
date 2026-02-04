"use client";

import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Clients", value: 18 },
    { label: "Active Programs", value: 4 },
    { label: "Monthly Revenue", value: "KES 180,000" },
    { label: "Pending Renewals", value: 3 },
  ];

  const clients = [
    {
      name: "John Doe",
      email: "john@example.com",
      program: "Fat Loss",
      status: "Active",
       lastActive: "Today" 
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      program: "Muscle Gain",
      status: "Active",
       lastActive: "Yesterday" 
    },
    {
      name: "Mike Brian",
      email: "mike@example.com",
      program: "Beginner Fitness",
      status: "Expired",
       lastActive: "5 days ago" 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] to-[#121212] text-white py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="flex item-start justify-between">
          <div >
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-400 mt-1">Trainer Control Panel</p>
          </div>
          <Link href={"/"} className="bg-button px-8 py-3 text-textSecondary font-medium transition-colors flex items-center">
            <i className="ri-arrow-left-line"></i> Back to Home
          </Link>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#181818] rounded-2xl p-6 border border-white/5 shadow-lg"
            >
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Clients */}
        <div className="bg-[#181818] rounded-2xl p-6 border border-white/5 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Clients</h2>

            <button className="px-4 py-2 bg-yellow-600 text-black rounded-lg text-sm">
              <i className="ri-user-add-line"></i> Add Client
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-white/10">
                <tr>
                  <th className="py-3 text-left">Name</th>
                  <th className="py-3 text-left">Email</th>
                  <th className="py-3 text-left">Program</th>
                  <th className="py-3 text-left">Status</th>
                   <th className="py-3 text-left">Last Active</th>
                  <th className="py-3 text-right">Actions</th>
                  
                </tr>
              </thead>

              <tbody>
                {clients.map((client, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="py-4">{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.program}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          client.status === "Active"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td>{client.lastActive}</td>
                    <td className="text-right space-x-2">
                      <button className="text-yellow-400 text-sm">
                        View
                      </button>
                      <button className="text-slate-400 text-sm">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Programs */}
        <div className="bg-[#181818] rounded-2xl p-6 border border-white/5 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Programs</h2>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-[#101010] rounded-lg p-4">
              Fat Loss Program
            </div>
            <div className="bg-[#101010] rounded-lg p-4">
              Muscle Gain Program
            </div>
            <div className="bg-[#101010] rounded-lg p-4">
              Beginner Fitness
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="bg-[#181818] rounded-2xl p-6 border border-white/5 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Recent Payments</h2>

          <ul className="text-sm space-y-3">
            <li className="flex justify-between bg-[#101010] p-3 rounded">
              <span>John Doe</span>
              <span>KES 10,000</span>
            </li>
            <li className="flex justify-between bg-[#101010] p-3 rounded">
              <span>Jane Smith</span>
              <span>KES 10,000</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

// "use client";

// export default function AdminDashboard() {
//   // Dummy Data
//   const stats = [
//     { label: "Active Clients", value: 18 },
//     { label: "Programs", value: 4 },
//     { label: "Monthly Revenue", value: "KES 180,000" },
//     { label: "Inactive Clients", value: 3 },
//   ];

//   const clients = [
//     { name: "John Doe", program: "Fat Loss", status: "Active", lastActive: "Today" },
//     { name: "Jane Smith", program: "Muscle Gain", status: "Active", lastActive: "Yesterday" },
//     { name: "Mike Brian", program: "Beginner Fitness", status: "Inactive", lastActive: "5 days ago" },
//   ];

//   const recentPayments = [
//     { name: "John Doe", amount: "KES 10,000" },
//     { name: "Jane Smith", amount: "KES 10,000" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] to-[#121212] text-white p-8">
//       {/* Header */}
//       <div className="mb-10">
//         <h1 className="text-4xl font-bold">Admin Dashboard</h1>
//         <p className="text-slate-400 mt-1">Trainer Control Panel</p>
//       </div>

//       {/* KPIs */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         {stats.map((stat, i) => (
//           <div key={i} className="bg-[#181818] p-6 rounded-2xl shadow-lg">
//             <p className="text-sm text-slate-400">{stat.label}</p>
//             <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Clients Table */}
//       <div className="bg-[#181818] p-6 rounded-2xl shadow-lg mb-10">
//         <h2 className="text-lg font-semibold mb-4">Clients</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="text-slate-400 border-b border-white/10">
//               <tr>
//                 <th className="py-3 text-left">Name</th>
//                 <th className="py-3 text-left">Program</th>
//                 <th className="py-3 text-left">Status</th>
//                 <th className="py-3 text-left">Last Active</th>
//               </tr>
//             </thead>
//             <tbody>
//               {clients.map((c, i) => (
//                 <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
//                   <td className="py-3">{c.name}</td>
//                   <td>{c.program}</td>
//                   <td>
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs ${
//                         c.status === "Active"
//                           ? "bg-green-500/10 text-green-400"
//                           : "bg-red-500/10 text-red-400"
//                       }`}
//                     >
//                       {c.status}
//                     </span>
//                   </td>
//                   <td>{c.lastActive}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Recent Payments */}
//       <div className="bg-[#181818] p-6 rounded-2xl shadow-lg mb-10">
//         <h2 className="text-lg font-semibold mb-4">Recent Payments</h2>
//         <ul className="space-y-2 text-sm">
//           {recentPayments.map((p, i) => (
//             <li key={i} className="flex justify-between bg-[#101010] p-3 rounded">
//               <span>{p.name}</span>
//               <span>{p.amount}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
