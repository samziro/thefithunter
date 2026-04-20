"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Title from "@/components/Title";
import PackageCard from "@/components/PackageCard";
import Head from "next/head";
import Image from "next/image";

export default function ProgramPage() {
  const router = useRouter();

    const premiumPackages: Package[] = [
    {
      title: "Jade Package",
      price: 20625,
      features: [
        "5 sessions",
        "Save 8%",
        "Meal plan",
        "Personal workouts",
        "Progress tracking",
      ],
      variant: "standardCard",
      ctaLabel: "Get Started",
    },
    {
      title: "Diamond Package",
      price: 55500,
      features: [
        "15 sessions",
        "Save 18%",
        "Meal plan",
        "Personal workouts",
        "Progress tracking",
      ],
      badge: "Best Value",
      variant: "premiumCard",
      ctaLabel: "Get Started",
    },
    {
      title: "Emerald Package",
      price: 39170,
      features: [
        "10 sessions",
        "Save 13%",
        "Meal plan",
        "Personal workouts",
        "Progress tracking",
      ],
      variant: "standardCard",
      ctaLabel: "Get Started",
    },
  ];

  return (
    <>
      <Head>
        <title>Personal Training Packages | Fit Hunter</title>
      </Head>

      <div className="min-h-dvh">
        <Header />

        {/* PREMIUM */}
        <section className="py-20 bg-lightBg">
          <div className="max-w-7xl mx-auto px-6">
            <Title heading="Premium Packages" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {premiumPackages.map((pkg, i) => (
                <PackageCard
                  key={i}
                  title={pkg.title}
                  price={`KSh ${pkg.price.toLocaleString()}`}
                  features={pkg.features}
                  badge={pkg.badge}
                  variant={pkg.variant}
                  ctaLabel={pkg.ctaLabel}
                  onClick={() => handleBuyClick(pkg)}
                />
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
