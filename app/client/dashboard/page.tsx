"use client";

import { useState } from "react";

export default function ClientDashboard() {
  const [weight, setWeight] = useState("");
  const [mood, setMood] = useState("");
  const [loggedWorkouts, setLoggedWorkouts] = useState<any>({});

  // Dummy client + purchases
  const client = {
    fullName: "John Doe",
    email: "john@example.com",
    photo: "/about.webp",

    services: {
      physicalTraining: {
        active: true,
        remainingSessions: 8,
        nextSession: "Feb 6, 10:00 AM",
      },

      selfPaced: {
        active: true,
        expires: "Mar 4",
        videos: ["Upper Body", "Lower Body", "Core Burn"],
      },

      mealPlan: {
        active: false,
        meals: ["Eggs + Oats", "Chicken Rice", "Fish Veggies"],
      },

      onlineCoaching: {
        active: true,
        nextLive: "Feb 5, 7:00 PM",
      },
    },
  };

  const workouts = [
    "Pushups + Squats",
    "Cardio + Core",
    "Rest Day",
    "Full Body",
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <img src={client.photo} className="w-14 h-14 rounded-full border border-yellow-500" />
            <div>
              <h1 className="text-3xl font-bold">{client.fullName}</h1>
              <p className="text-slate-400">{client.email}</p>
            </div>
          </div>
        </div>

        {/* ACTIVE SERVICES */}
        <section>
          <h2 className="text-xl font-semibold mb-4">My Active Services</h2>

          <div className="grid md:grid-cols-4 gap-6">

            {/* Physical */}
            <ServiceCard
              title="🏋️ Physical Training"
              active={client.services.physicalTraining.active}
              info={`Sessions left: ${client.services.physicalTraining.remainingSessions}`}
              action="View Schedule"
            />

            {/* Self Paced */}
            <ServiceCard
              title="💻 Self Paced"
              active={client.services.selfPaced.active}
              info={`Expires: ${client.services.selfPaced.expires}`}
              action="Watch Videos"
            />

            {/* Meal */}
            <ServiceCard
              title="🥗 Meal Plan"
              active={client.services.mealPlan.active}
              info="Nutrition Access"
              action="Upgrade"
            />

            {/* Coaching */}
            <ServiceCard
              title="🎥 Online Coaching"
              active={client.services.onlineCoaching.active}
              info={`Next Live: ${client.services.onlineCoaching.nextLive}`}
              action="Join Session"
            />

          </div>
        </section>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* Physical Training */}
            {client.services.physicalTraining.active && (
              <Panel title="Physical Training">
                {workouts.map((w, i) => (
                  <label key={i} className="flex justify-between bg-[#111] p-3 rounded">
                    {w}
                    <input
                      type="checkbox"
                      onChange={() =>
                        setLoggedWorkouts({ ...loggedWorkouts, [w]: !loggedWorkouts[w] })
                      }
                    />
                  </label>
                ))}
              </Panel>
            )}

            {/* Self Paced */}
            {client.services.selfPaced.active && (
              <Panel title="Workout Videos">
                {client.services.selfPaced.videos.map((v, i) => (
                  <div key={i} className="bg-[#111] p-3 rounded">
                    ▶ {v}
                  </div>
                ))}
              </Panel>
            )}

            {/* Meal Plan */}
            {client.services.mealPlan.active && (
              <Panel title="Meal Plan">
                {client.services.mealPlan.meals.map((m, i) => (
                  <div key={i}>{m}</div>
                ))}
              </Panel>
            )}

            {/* Weekly Checkin */}
            <Panel title="Weekly Check-in">
              <input
                placeholder="Mood / Energy"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full bg-black border p-3 rounded"
              />

              <button className="mt-3 bg-yellow-600 w-full py-2 rounded text-black">
                Submit
              </button>
            </Panel>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* Progress */}
            <Panel title="Progress Tracker">
              <input
                placeholder="Weight kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-black border p-3 rounded mb-3"
              />
              <button className="bg-yellow-600 w-full py-2 rounded text-black">
                Save Progress
              </button>
            </Panel>

            {/* Billing */}
            <Panel title="Billing Status">
              <p>Physical Training: Active</p>
              <p>Self Paced: Active</p>
              <p>Meal Plan: Not Purchased</p>
              <p>Online Coaching: Active</p>
            </Panel>

          </div>
        </div>
      </div>
    </div>
  );
}

/* Small Components */

function Panel({ title, children }: any) {
  return (
    <div className="bg-[#181818] p-6 rounded-xl border border-white/5 space-y-4">
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function ServiceCard({ title, active, info, action }: any) {
  return (
    <div className="bg-[#181818] p-5 rounded-xl border border-white/5 space-y-3">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-slate-400">{info}</p>

      <span className={`text-xs ${active ? "text-green-400" : "text-red-400"}`}>
        {active ? "Active" : "Not Purchased"}
      </span>

      <button className="w-full bg-yellow-600 py-2 rounded text-black">
        {action}
      </button>
    </div>
  );
}

// "use client";

// import { useState } from "react";

// export default function ClientDashboard() {
//   const [weight, setWeight] = useState("");
//   const [mood, setMood] = useState("");

//   const client = {
//     fullName: "John Doe",
//     program: "12 Week Body Recomposition",
//     packageType: "Premium Coaching",
//     status: "Active",
//     nextCheckin: "Feb 10",
//     bodyMetrics: { weight: 72, bodyFat: 18 },
//     workoutsCompleted: 14,
//     totalWorkouts: 24,
//     mealsAdherence: "85%",
//     trainer: "Coach Samuel",
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] to-[#121212] text-white py-20">
//       <div className="max-w-7xl mx-auto px-6 space-y-10">

//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold">Welcome back, John 👋</h1>
//             <p className="text-slate-400 mt-1">{client.program}</p>
//           </div>

//           <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm">
//             ● {client.status}
//           </span>
//         </div>

//         {/* KPI Cards */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             { label: "Current Weight", value: `${client.bodyMetrics.weight}kg` },
//             { label: "Body Fat", value: `${client.bodyMetrics.bodyFat}%` },
//             { label: "Workout Progress", value: `${client.workoutsCompleted}/${client.totalWorkouts}` },
//             { label: "Meal Adherence", value: client.mealsAdherence },
//           ].map((item, i) => (
//             <div key={i} className="bg-[#181818] p-6 rounded-2xl border border-white/5">
//               <p className="text-sm text-slate-400">{item.label}</p>
//               <p className="mt-2 text-2xl font-semibold">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">

//           {/* Main Column */}
//           <div className="lg:col-span-2 space-y-8">

//             {/* Program Card */}
//             <div className="bg-[#181818] p-6 rounded-2xl border border-white/5">
//               <h2 className="font-semibold mb-2">Your Coaching Package</h2>
//               <p>{client.packageType}</p>
//               <p className="text-sm text-slate-400 mt-1">Trainer: {client.trainer}</p>
//               <p className="text-sm text-yellow-400 mt-2">Next Check-in: {client.nextCheckin}</p>
//             </div>

//             {/* Weekly Checkin */}
//             <div className="bg-[#181818] p-6 rounded-2xl border border-white/5">
//               <h2 className="font-semibold mb-4">Weekly Check-in</h2>

//               <textarea
//                 placeholder="How are you feeling this week?"
//                 value={mood}
//                 onChange={(e) => setMood(e.target.value)}
//                 className="w-full bg-[#101010] rounded-lg p-3 border border-white/10"
//               />

//               <button className="mt-4 w-full py-3 bg-yellow-600 rounded-lg text-black font-medium">
//                 Submit Check-in
//               </button>
//             </div>

//             {/* Progress Update */}
//             <div className="bg-[#181818] p-6 rounded-2xl border border-white/5">
//               <h2 className="font-semibold mb-4">Update Weight</h2>

//               <input
//                 placeholder="Enter current weight"
//                 value={weight}
//                 onChange={(e) => setWeight(e.target.value)}
//                 className="w-full bg-[#101010] rounded-lg p-3 border border-white/10"
//               />

//               <button className="mt-4 w-full py-3 bg-yellow-600 rounded-lg text-black font-medium">
//                 Save Progress
//               </button>
//             </div>
//           </div>

//           {/* Side Column */}
//           <div className="space-y-8">

//             {/* Package Summary */}
//             <div className="bg-[#181818] p-6 rounded-2xl border border-white/5">
//               <h2 className="font-semibold mb-3">Package Summary</h2>
//               <p>{client.packageType}</p>
//               <p className="text-sm text-slate-400 mt-1">Program: {client.program}</p>
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-[#181818] p-6 rounded-2xl border border-white/5">
//               <h2 className="font-semibold mb-3">Quick Actions</h2>

//               <div className="space-y-3 text-sm">
//                 <button className="w-full bg-[#101010] py-2 rounded">View Workouts</button>
//                 <button className="w-full bg-[#101010] py-2 rounded">Meal Plan</button>
//                 <button className="w-full bg-[#101010] py-2 rounded">Message Trainer</button>
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
