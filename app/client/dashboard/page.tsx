"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ClientDashboard() {
  const [client, setClient] = useState<any>(null);
  const [weight, setWeight] = useState("");
  const [mood, setMood] = useState("");
  const [loggedWorkouts, setLoggedWorkouts] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // Fetch client data from API
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch("/api/get-client"); // create this route
        const data = await res.json();

        if (data.success) {
          setClient(data.client);
        } else {
          console.error("Failed to fetch client:", data.error);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, []);

  if (loading) return <div className="h-dvh p-8 flex items-center justify-center text-xl">Loading...</div>;
  if (!client) return <div className="h-dvh p-8 flex items-center justify-center text-xl">Client not found</div>;

  const workouts = client.services?.physicalTraining?.workouts || [];

  return (
    <div className="min-h-screen bg-bg text-white py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <img
              src={client.photo || "/about.webp"}
              className="w-14 h-14 rounded-full border border-yellow-500"
            />
            <div>
              <h1 className="text-3xl font-bold">{client.fullName}</h1>
              <p className="text-slate-400">{client.email}</p>
            </div>
          </div>
          <Link
            href={"/"}
            className="bg-button px-8 py-3 text-textSecondary font-medium transition-colors flex items-center"
          >
            <i className="ri-arrow-left-line"></i> Back to Home
          </Link>
        </div>

        {/* ACTIVE SERVICES */}
        <section>
          <h2 className="text-xl font-semibold mb-4">My Active Services</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {client.services?.physicalTraining && (
              <ServiceCard
                title="🏋️ Physical Training"
                active={client.services.physicalTraining.active}
                info={`Sessions left: ${client.services.physicalTraining.remainingSessions}`}
                action="View Schedule"
              />
            )}

            {client.services?.selfPaced && (
              <ServiceCard
                title="💻 Self Paced"
                active={client.services.selfPaced.active}
                info={`Expires: ${client.services.selfPaced.expires}`}
                action="Watch Videos"
              />
            )}

            {client.services?.mealPlan && (
              <ServiceCard
                title="🥗 Meal Plan"
                active={client.services.mealPlan.active}
                info="Nutrition Access"
                action="Upgrade"
              />
            )}

            {client.services?.onlineCoaching && (
              <ServiceCard
                title="🎥 Online Coaching"
                active={client.services.onlineCoaching.active}
                info={`Next Live: ${client.services.onlineCoaching.nextLive}`}
                action="Join Session"
              />
            )}
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {client.services?.physicalTraining?.active && (
              <Panel title="Physical Training">
                {workouts.map((w: string, i: number) => (
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

            {client.services?.selfPaced?.active && (
              <Panel title="Workout Videos">
                {client.services.selfPaced.videos.map((v: string, i: number) => (
                  <div key={i} className="bg-[#111] p-3 rounded">
                    ▶ {v}
                  </div>
                ))}
              </Panel>
            )}

            {client.services?.mealPlan?.active && (
              <Panel title="Meal Plan">
                {client.services.mealPlan.meals.map((m: string, i: number) => (
                  <div key={i}>{m}</div>
                ))}
              </Panel>
            )}

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

            <Panel title="Billing Status">
              {client.services?.physicalTraining && (
                <p>Physical Training: {client.services.physicalTraining.active ? "Active" : "Not Purchased"}</p>
              )}
              {client.services?.selfPaced && (
                <p>Self Paced: {client.services.selfPaced.active ? "Active" : "Not Purchased"}</p>
              )}
              {client.services?.mealPlan && (
                <p>Meal Plan: {client.services.mealPlan.active ? "Active" : "Not Purchased"}</p>
              )}
              {client.services?.onlineCoaching && (
                <p>Online Coaching: {client.services.onlineCoaching.active ? "Active" : "Not Purchased"}</p>
              )}
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
    <div className="bg-lightBg p-6 rounded-xl border border-white/5 space-y-4">
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function ServiceCard({ title, active, info, action }: any) {
  return (
    <div className="bg-lightBg p-5 rounded-xl border border-white/5 space-y-3">
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