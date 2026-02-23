"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import PackageCard from "@/components/PackageCard";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function ProgramPage() {
  const router = useRouter();

  const [selectedPackage, setSelectedPackage] = useState<{
    title: string;
    price: number;
  } | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nation: "",
    goals: "",
    age: ""
  });

  

  const onClose = () => {
    router.back();
  };


  const handleBuyClick = (title: string, price: number) => {
    setSelectedPackage({ title, price });
  };


  const payWithPaystack = async () => {
  if (!selectedPackage) return;

  const reference = `fit_${Date.now()}`;

  // 1️⃣ Save client first
  const saveRes = await fetch("/api/create-client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      nation: formData.nation,
      age: formData.age,
      goals: formData.goals,
      packageTitle: selectedPackage.title,
      packagePrice: selectedPackage.price,
      reference,
    }),
  });

  const saveData = await saveRes.json();

  if (!saveData.success) {
    alert("Failed to save client details");
    return;
  }

  // 2️⃣ Open Paystack
  const handler = window.PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    email: formData.email,
    amount: selectedPackage.price * 100,
    currency: "KES",
    ref: reference,

    callback: function (response: any) {
      // Use an IIFE to handle async inside a synchronous callback
      (async () => {
        try {
          await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference }),
          });

          alert("Payment successful!");
          // ✅ Redirect to client dashboard
          window.location.href = "/client/dashboard";

        } catch (err) {
          console.error(err);
          alert("Payment verified, but something went wrong!");
        }
      })();
    },

    onClose: function () {
      console.log("Payment closed");
    },
  });

  handler.openIframe();
};
  
  return (
    <>
      <Head>
        <title>
          Personal Training Packages Watamu Kenya | Affordable Fitness Programs
          - Fit Hunter
        </title>
        <meta
          name="description"
          content="Discover affordable personal trainer packages in Watamu, Kenya. From weight loss programs to strength training and online coaching, choose flexible fitness plans at your preferred location."
        />
        <meta
          name="keywords"
          content="personal trainer Watamu, fitness programs Watamu Kenya, affordable personal training packages Watamu, weight loss trainer Watamu, strength training Watamu, online personal training Kenya, fitness coaching Watamu"
        />
      </Head>

      <div className="min-h-dvh">
        <Header />

        {/* Hero Section */}
        <section
          className="relative h-[90dvh] flex items-center justify-center text-textSecondary bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/trainer.jpg')`,
          }}
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
              Pick Your Fitness Plan
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Simple, effective programs from your personal trainer in
              Watamu building strength and confidence, one step at a time.
            </p>
          </div>
        </section>

        {/* Premium Packages */}
        <section className="py-20 bg-lightBg">
          <div className="max-w-7xl mx-auto px-6">
            <Title heading="Premium Packages" />
            <p className="text-lg text-textMain text-center mb-12 leading-relaxed">
              Tailored for serious results, with nutrition and tracking
              included. Save more with bigger packages.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PackageCard
                title="Jade Package"
                price="KSh 20,625"
                features={[
                  "5 sessions",
                  "Save 8%",
                  "Meal plan",
                  "Personal workouts",
                  "Progress tracking",
                ]}
                variant="standardCard"
                ctaLabel="Get Started"
                onClick={() => handleBuyClick("Jade Package", 20625)}
              />
              <PackageCard
                title="Diamond Package"
                price="KSh 55,500"
                features={[
                  "15 sessions",
                  "Save 18%",
                  "Meal plan",
                  "Personal workouts",
                  "Progress tracking",
                ]}
                badge="Best Value"
                variant="premiumCard"
                ctaLabel="Get Started"
                onClick={() => handleBuyClick("Diamond Package", 55500)}
              />
              <PackageCard
                title="Emerald Package"
                price="KSh 39,170"
                features={[
                  "10 sessions",
                  "Save 13%",
                  "Meal plan",
                  "Personal workouts",
                  "Progress tracking",
                ]}
                variant="standardCard"
                ctaLabel="Get Started"
                onClick={() => handleBuyClick("Emerald Package", 39170)}
              />
            </div>
            <div className="text-center mt-12">
              <p className="text-lg text-textMain mb-6 max-w-4xl mx-auto leading-relaxed">
                All premium packages include personalized nutrition guidance and
                home workouts—backed by 5+ years of professional training
                experience.
              </p>
              <a href="mailto:1fithunter@gmail.com">
                <button className="bg-button text-white px-8 py-3 text-lg font-semibold hover:bg-buttonHover transition-colors font-poppins">
                  Book Consultation
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Standard Packages */}
        <section className="py-20 bg-bg">
          <div className="max-w-7xl mx-auto px-6">
            <Title heading="Standard Packages" />
            <p className="text-lg text-textMain text-center mb-12 leading-relaxed">
              Flexible options for one-on-one sessions. Start small or commit
              for savings. <br />
              They are only available for in-person training in Watamu.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <PackageCard
                title="Single Session"
                price="KSh 2,000"
                features={["1 session", "Personalized workout", "Expert tips"]}
                variant="standardCard"
                ctaLabel="Book Now"
                onClick={() => handleBuyClick("Single Session", 2000)}
              />
              <PackageCard
                title="6 Sessions"
                price="KSh 11,400"
                features={["6 sessions", "Save 5%", "Email support"]}
                variant="standardCard"
                ctaLabel="Get Started"
                onClick={() => handleBuyClick("6 Sessions", 11400)}
              />
              <PackageCard
                title="10 Sessions"
                price="KSh 18,000"
                features={["10 sessions", "Save 10%", "Priority support"]}
                badge="Popular"
                variant="premiumCard"
                ctaLabel="Get Started"
                onClick={() => handleBuyClick("10 Sessions", 18000)}
              />
              <PackageCard
                title="16 Sessions"
                price="KSh 21,600"
                features={["16 sessions", "Save 15%", "Monthly check-ins"]}
                variant="standardCard"
                ctaLabel="Get Started"
                onClick={() => handleBuyClick("16 Sessions", 21600)}
              />
            </div>
          </div>
        </section>

        {/* Online Services */}
        <section className="py-20 bg-lightBg">
          <div className="max-w-7xl mx-auto px-6">
            <Title heading="Online Services" />
            <p className="text-lg text-textMain text-center mb-12 leading-relaxed">
              Train from anywhere with virtual options perfect for busy
              schedules.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PackageCard
                title="Self-Paced"
                price="KSh 3,000 / mon"
                features={[
                  "Video Demonstration",
                  "Email support",
                  "Flexible access",
                ]}
                variant="standardCard"
                ctaLabel="Get Started"
                onClick={() => handleBuyClick("Self-Paced", 3000)}
              />
              <PackageCard
                title="Meal Plan"
                price="KSh 11,500 / mon"
                features={[
                  "Custom nutrition",
                  "Weekly tips",
                  "Progress tracking",
                ]}
                badge="Essential"
                variant="premiumCard"
                ctaLabel="Get Started"
                onClick={() => handleBuyClick("Meal Plan", 11500)}
              />
              <PackageCard
                title="Online Coaching"
                price="KSh 30,000 / mon"
                features={[
                  "Live sessions",
                  "Personal plans",
                  "Ongoing support",
                ]}
                variant="standardCard"
                ctaLabel="Get Started"
                onClick={() => handleBuyClick("Online Coaching", 30000)}
              />
            </div>
          </div>
        </section>

        {/* Training Promise */}
        <section className="py-20 bg-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-textSecondary mb-4 font-poppins">
                Promise
              </h2>
              <p className="text-lg md:text-xl text-textMain leading-relaxed">
                Effective, personalized fitness from a professional trainer in
                Watamu.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-heart-pulse-line text-yellow-600 text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-textSecondary font-poppins">
                  Tailored Plans
                </h3>
                <p className="text-textMain text-base leading-relaxed">
                  Customized to your goals and lifestyle.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-check-line text-yellow-600 text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-textSecondary font-poppins">
                  Professional Guidance
                </h3>
                <p className="text-textMain text-base leading-relaxed">
                  Safe methods with proven results.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-group-line text-yellow-600 text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-textSecondary font-poppins">
                  Real Results
                </h3>
                <p className="text-textMain text-base leading-relaxed">
                  Join 100+ transformed clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-lightBg">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-textSecondary">
              Ready to Get Fit?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-textMain leading-relaxed">
              Start with a free consultation from your trusted personal trainer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:1thefithunter@gmail.com"
                className="bg-white text-button px-8 py-3 text-lg font-semibold hover:bg-gray-100 transition-colors font-poppins"
              >
                Book Consultation
              </a>
              <a
                href="tel:+254748679264"
                className="border-2 border-white text-white px-8 py-3 text-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors font-poppins"
              >
                Call +254 748 679 264
              </a>
            </div>
          </div>
        </section>
        {/* Auth Modal (simple example – style with Tailwind) */}
        {selectedPackage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-bg rounded-2xl p-8 max-w-4xl w-full mx-4 grid grid-cols-2 gap-8">
              <div className="grid grid-cols-1 gap-4 bg-lightBg p-4 rounded-xl">
                <Image
                  width={600}
                  height={600}
                  alt="package"
                  src={"/mike.webp"}
                  className="h-56 object-cover rounded-lg"
                />
                <div className="grid grid-cols-1 gap-4">
                  <h1 className="text-xl">cardio hiit</h1>
                  <h2 className="text-3xl">KES 3,000</h2>
                  <h5 className="text-sm">WHAT YOU'LL GET:</h5>
                  <p>
                    <i className="ri-verified-badge-line"></i> 6 sessions
                  </p>
                  <p>
                    <i className="ri-verified-badge-line"></i> Save 5%
                  </p>
                  <p>
                    <i className="ri-verified-badge-line"></i> Email support
                  </p>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-center gap-4">
                  <Image
                    width={100}
                    height={100}
                    alt="package"
                    src={"/logo.webp"}
                    className=""
                  />
                  <h2 className="text-2xl font-bold">Sign Up</h2>

                  <p className="mb-4">Please sign up to continue purchasing.</p>
                </div>

                <form action="#" className="grid grid-cols-1 gap-4">
                  
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Phone Number"
                    value={formData.phone}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="National"
                    value={formData.nation}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) =>
                      setFormData({ ...formData, nation: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="goal"
                    value={formData.goals}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) =>
                      setFormData({ ...formData, goals: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={payWithPaystack}
                    className="bg-button text-white px-6 py-3 rounded w-full font-bold"
                  >
                    PAY KES {selectedPackage?.price?.toLocaleString()}
                  </button>
                </form>
                <div className="flex items-center justify-between py-4">
                  <p
                    onClick={onClose}
                    className="font-bold text-button cursor-pointer underline"
                  >
                    cancel
                  </p>
                  <p>
                    Already have account?{" "}
                    <span className="font-bold text-button cursor-pointer ">
                      sign in
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {/* {isConfirmModalOpen && selectedPackage && user && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#333] rounded-lg p-8 max-w-lg w-full mx-4">
              <h2 className="text-2xl font-bold mb-6">Confirm Purchase</h2>
              
              <div className="space-y-4 mb-8">
                <div>
                  <p className="font-semibold">Package:</p>
                  <p className="text-lg">{selectedPackage.title}</p>
                </div>
                <div>
                  <p className="font-semibold">Amount:</p>
                  <p className="text-xl font-bold">KSh {selectedPackage.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-semibold">User:</p>
                  <p>{user.email}</p>
                  <p className="text-sm text-gray-600">
                    {user.user_metadata?.full_name || "Name not set"}
                  </p>
                </div>
              </div>

              <button
                onClick={payWithPaystack}
                className="bg-green-600 text-white px-8 py-4 rounded w-full text-lg font-semibold hover:bg-green-700 mb-4"
              >
                Make Payment (KSh {selectedPackage.price.toLocaleString()})
              </button>

              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="text-gray-600 underline w-full text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        )} */}

        <Footer />
      </div>
    </>
  );
}
