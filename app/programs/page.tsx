"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
// ─── Types ───────────────────────────────────────────────────────────────────

type Package = {
 title: string;
 sessions: number;
 price: number;
 originalPrice: number;
 savingsAmount: number;
 savingsPct: number;
 pricePerSession: number;
 features: string[];
 featured?: boolean;
 badge?: string;
 urgency?: string;
 sessionNote?: string;
 ctaLabel: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
// FIX: Reordered ascending (Jade → Emerald → Diamond) so the anchor price
// sits in the visual centre where the eye naturally lands.

const packages: Package[] = [
 {
 title: "Jade",
 sessions: 5,
 price: 20_625,
 originalPrice: 22_500,
 savingsAmount: 1_875,
 savingsPct: 8,
 pricePerSession: 4_125,
 features: [
  "5 * 1-hour personal training sessions",
  "Personalised workout program",
  "Weekly progress check-ins",
  "WhatsApp trainer support",
 ],
 ctaLabel: "Start with Jade",
 sessionNote: "Perfect for first-timers",
 },

 {
 title: "Diamond",
 sessions: 15,
 price: 55_500,
 originalPrice: 67_500,
 savingsAmount: 12_000,
 savingsPct: 18,
 pricePerSession: 3_700,
 features: [
  "15 * 1-hour personal training sessions",
  "Periodised training program",
  "Bi-weekly progress reviews",
  "Priority WhatsApp support",
  "Full body composition analysis",
 ],
 featured: true,
 badge: "Best Value",
 urgency: "Only 3 spots left this month",
 ctaLabel: "Claim Diamond deal",
 },
 {
 title: "Emerald",
 sessions: 10,
 price: 39_170,
 originalPrice: 45_000,
 savingsAmount: 5_830,
 savingsPct: 13,
 pricePerSession: 3_917,
 features: [
 "10 * 1-hour personal training sessions",
 "Progressive workout program",
 "Bi-weekly progress reviews",
 "WhatsApp trainer support",
 ],
 ctaLabel: "Start with Emerald",
 sessionNote: "Most popular with returners",
 },
 
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckIcon() {
 return (
 <svg
 className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5"
 viewBox="0 0 16 16"
 fill="none"
 aria-hidden="true"
 >
 <circle cx="8" cy="8" r="8" className="fill-yellow-100" />
 <path
  d="M5 8.5l2 2 4-4"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
</svg>
);
}

function PricingCard({
 pkg,
 onBuy,
}: {
 pkg: Package;
 onBuy: (pkg: Package) => void;
}) {
 return (
 <div
 className={`relative flex flex-col p-6 transition-shadow duration-200
 ${
 pkg.featured
 ? "bg-button"
 : "bg-bg hover:shadow-md"
 }`}
 >
 {/* Best Value badge */}
 {pkg.badge && (
 <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
 <span className="bg-button text-yellow-100 border-2 border-yellow-100 text-xs font-medium px-4 py-1 rounded-full whitespace-nowrap">
 {pkg.badge}
 </span>
 </div>
 )}

{/* Header */}
 <div className="mb-4">
 <p className="text-sm font-medium text-textMain mb-1">
 {pkg.title} . {pkg.sessions} sessions
 </p>

 {/* Price + original */}
 <div className="flex items-baseline gap-2 flex-wrap">
 <span className="text-3xl font-semibold text-textSecondary">
 KSh {pkg.price.toLocaleString()}
 </span>
 <span className="text-sm text-textMain line-through">
 KSh {pkg.originalPrice.toLocaleString()}
 </span>
 </div>

 {/* Per-session breakdown  makes the saving visceral */}
 <p className="text-sm text-textMain mt-0.5">
 KSh {pkg.pricePerSession.toLocaleString()} per session
 </p>

 {/* Savings pill */}
 {
 pkg.featured?<span className="inline-block mt-2 bg-bg/20 border-2 border-bg/30 text-textMain text-xs font-medium px-2.5 py-1 rounded-md">
 Save KSh {pkg.savingsAmount.toLocaleString()} ({pkg.savingsPct}%)
 </span> : <span className="inline-block mt-2 bg-button/20 border-2 border-button/30 text-yellow-600 text-xs font-medium px-2.5 py-1 rounded-md">
 Save KSh {pkg.savingsAmount.toLocaleString()} ({pkg.savingsPct}%)
 </span>
 }
 
 </div>

 <hr className="border-gray-100 mb-4 " />

 {/* Features */}
   <ul className="flex flex-col gap-2.5 mb-6 flex-1">
    {pkg.features.map((f, i) => (
     <li key={i} className="flex items-start gap-2 text-sm text-textMain">
 <CheckIcon />
 {f}
     </li>
    ))}
   </ul>

   {/* CTA */}
   <button
    onClick={() => onBuy(pkg)}
    className={`w-full py-3 text-sm font-semibold transition-all duration-150 active:scale-[0.98]
     ${
 pkg.featured
  ? "bg-textSecondary hover:bg-yellow-600 hover:border-2 hover:border-yellow-100 text-bg hover:text-yellow-100"
  : "bg-textSecondary hover:bg-button text-bg hover:text-yellow-100"
     }`}
   >
    {pkg.ctaLabel} →
   </button>

   {/* Urgency / session note */}
   {pkg.urgency && (
    <p className="flex items-center justify-center gap-1.5 mt-3 text-xs text-yellow-100 font-medium">
     <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
     {pkg.urgency}
    </p>
   )}
   {pkg.sessionNote && !pkg.urgency && (
    <p className="mt-3 text-xs text-center text-textMain">{pkg.sessionNote}</p>
   )}
  </div>
 );
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const faqs = [
 {
  q: "Can I pay via M-Pesa?",
  a: "Yes we accept M-Pesa, card, and bank transfer at checkout. No hidden fees.",
 },
 {
  q: "What if I need to reschedule?",
  a: "Reschedule up to 24 hours in advance with no penalty. Your sessions never expire.",
 },
 {
  q: "Where are the sessions held?",
  a: "At our Nairobi studio, your home, or a location of your choice  trainer travel is included.",
 },
 {
  q: "Is there a satisfaction guarantee?",
  a: "Absolutely. If you're not happy after your first session, we'll refund you in full no questions asked.",
 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

// Replace with your WhatsApp Business number (country code, no + or spaces)
const WHATSAPP_NUMBER = "254748679264";

export default function ProgramPage() {
 const handleBuyClick = (pkg: Package) => {
  const message =
   `Hi! I'm interested in the *${pkg.title} Package* ` +
   `(${pkg.sessions} sessions) for *KSh ${pkg.price.toLocaleString()}*. ` +
   `Could you share more details and book a session?`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
 };

 return (
  <div className="min-h-dvh">
   <Header />

   {/* ── PRICING SECTION ── */}
   <section className="py-20 px-4 bg-lightBg">
    <div className="max-w-5xl mx-auto">

     {/* Social proof pill */}
     <div className="flex justify-center mb-4">
 <span className="inline-flex items-center gap-1.5 bg-button/20 border-2 border-button/30 text-button text-xs font-medium px-4 py-1.5 rounded-full">
  <span className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
  Trusted by 100+ members across Kenya
 </span>
     </div>

     {/* Heading */}
     <h1 className="text-center text-3xl sm:text-4xl font-semibold text-textSecondary mb-3">
 Choose your transformation package
     </h1>
     <p className="text-center text-textMain text-base max-w-xl mx-auto mb-10 leading-relaxed">
 Every package includes a certified trainer, personalised meal plan,
 and unlimited WhatsApp support between sessions.
     </p>

     {/* Stats bar */}
     <div className="flex justify-center gap-8 sm:gap-16 mb-12 flex-wrap">
 {[
  { num: "100+", label: "Active members" },
  { num: "4.9★", label: "Average rating" },
  { num: "91%", label: "Achieve their goals" },
 ].map((s) => (
  <div key={s.label} className="text-center">
   <p className="text-2xl font-semibold text-textSecondary">{s.num}</p>
   <p className="text-xs text-textMain mt-0.5">{s.label}</p>
  </div>
 ))}
     </div>

     {/* Cards grid */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-content-center">
 {packages.map((pkg) => (
  <PricingCard key={pkg.title} pkg={pkg} onBuy={handleBuyClick} />
 ))}
     </div>

     {/* Trust signals */}
     <div className="flex flex-wrap justify-center gap-6 mt-8">
 {[
  "100% satisfaction guarantee",
  "Secure M-Pesa checkout",
  "Sessions expires in a month",
 ].map((t) => (
  <div key={t} className="flex items-center gap-2 text-sm text-textMain">
   <svg className="w-4 h-4 text-button" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" className="fill-yellow-100" />
    <path
     d="M5 8.5l2 2 4-4"
     stroke="currentColor"
     strokeWidth="1.5"
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </svg>
   {t}
  </div>
 ))}
     </div>
    </div>
   </section>
 
{/* ── FAQ SECTION ── */}
<section className=" border-y border-lightBg py-16 px-4 bg-bg border-t border-gray-100">
 <div className="max-w-2xl mx-auto">
  <h2 className="text-center text-2xl font-semibold text-textSecondary mb-8">
 Frequently Asked Questions
</h2>
<div className="flex flex-col gap-4">
 {faqs.map((faq) => (
<div
key={faq.q}
 className=" px-5 py-4 bg-button/20 border-2 border-button/30"
>
<p className="text-sm font-semibold text-textSecondary mb-1">{faq.q}</p>
<p className="text-sm text-textMain leading-relaxed">{faq.a}</p>
</div>
 ))}
 </div>
 </div>
 </section>

<Footer />
</div>
 );
}

