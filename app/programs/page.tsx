"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Title from "@/components/Title";
import PackageCard from "@/components/PackageCard";
import Head from "next/head";
import Image from "next/image";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

type Package = {
  title: string;
  price: number;
  features: string[];
  badge?: string;
  variant?: "standardCard" | "premiumCard";
  ctaLabel?: string;
};

export default function ProgramPage() {
  const router = useRouter();

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nation: "",
    goals: "",
    age: "",
  });

  // ----------FORM SANITIZAION ----------//
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {

  const newErrors: { [key: string]: string } = {};

  const trimmedFullName = formData.fullName.trim();

  const trimmedEmail = formData.email.trim().toLowerCase();

  const trimmedPhone = formData.phone.trim();

  const trimmedNation = formData.nation.trim();

  const trimmedGoals = formData.goals.trim();

  const trimmedAge = formData.age.trim();

  if (authMode === "signup") {
    if (trimmedFullName.length < 3)
      newErrors.fullName = "Full name must be at least 3 characters.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail))
    newErrors.email = "Invalid email format.";

  const phoneRegex = /^[0-9]{7,15}$/;
  if (!phoneRegex.test(trimmedPhone))
    newErrors.phone = "Phone must be 7–15 digits.";

  if (authMode === "signup") {
    if (!trimmedNation)
      newErrors.nation = "Nation is required.";

    if (!trimmedGoals)
      newErrors.goals = "Goals are required.";

    const ageNumber = Number(trimmedAge);
    if (isNaN(ageNumber) || ageNumber < 16 || ageNumber > 80)
      newErrors.age = "Age must be between 16 and 80.";
  }

  if (password.length < 6)
    newErrors.password = "Password must be at least 6 characters.";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  // -------------------------
  // PACKAGE DATA
  // -------------------------

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

  const standardPackages: Package[] = [
    {
      title: "Single Session",
      price: 2000,
      features: ["1 session", "Personalized workout", "Expert tips"],
    },
    {
      title: "6 Sessions",
      price: 11400,
      features: ["6 sessions", "Save 5%", "Email support"],
    },
    {
      title: "10 Sessions",
      price: 18000,
      features: ["10 sessions", "Save 10%", "Priority support"],
      badge: "Popular",
      variant: "premiumCard",
    },
    {
      title: "16 Sessions",
      price: 21600,
      features: ["16 sessions", "Save 15%", "Monthly check-ins"],
    },
  ];

  const onlinePackages: Package[] = [
    {
      title: "Self-Paced",
      price: 3000,
      features: ["Video Demonstration", "Email support", "Flexible access"],
    },
    {
      title: "Meal Plan",
      price: 11500,
      features: ["Custom nutrition", "Weekly tips", "Progress tracking"],
      badge: "Essential",
      variant: "premiumCard",
    },
    {
      title: "Online Coaching",
      price: 30000,
      features: ["Live sessions", "Personal plans", "Ongoing support"],
    },
  ];

  // -------------------------
  // HANDLERS
  // -------------------------

  const handleBuyClick = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  const onClose = () => {
    setSelectedPackage(null);
  };

  const payWithPaystack = async () => {

    if (!selectedPackage) return;

    const isValid = validateForm();
    if (!isValid) return;

    const reference = `fit_${Date.now()}`;

    const saveRes = await fetch("/api/create-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
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

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: formData.email,
      amount: selectedPackage.price * 100,
      currency: "KES",
      ref: reference,

      callback: function () {
        (async () => {
          try {
            await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ reference }),
            });

            window.location.href = "/client/dashboard";
          } catch (err) {
            console.error(err);
            alert("Payment verified but something went wrong.");
          }
        })();
      },

      onClose: function () {
        console.log("Payment closed");
      },
    });

    handler.openIframe();
  };

  // -------------------------
  // RENDER
  // -------------------------

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

        {/* STANDARD */}
        <section className="py-20 bg-bg">
          <div className="max-w-7xl mx-auto px-6">
            <Title heading="Standard Packages" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {standardPackages.map((pkg, i) => (
                <PackageCard
                  key={i}
                  title={pkg.title}
                  price={`KSh ${pkg.price.toLocaleString()}`}
                  features={pkg.features}
                  badge={pkg.badge}
                  variant={pkg.variant}
                  onClick={() => handleBuyClick(pkg)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ONLINE */}
        <section className="py-20 bg-lightBg">
          <div className="max-w-7xl mx-auto px-6">
            <Title heading="Online Services" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {onlinePackages.map((pkg, i) => (
                <PackageCard
                  key={i}
                  title={pkg.title}
                  price={`KSh ${pkg.price.toLocaleString()}`}
                  features={pkg.features}
                  badge={pkg.badge}
                  variant={pkg.variant}
                  onClick={() => handleBuyClick(pkg)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* MODAL */}
        {selectedPackage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-bg rounded-2xl p-8 max-w-4xl w-full mx-4 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="grid grid-cols-1 gap-4 bg-lightBg p-4 rounded-xl">
                <Image width={600} height={600} alt="package" src={"/mike.webp"} className="h-56 object-cover rounded-lg" />
                <h1 className="text-xl font-bold">{selectedPackage.title}</h1>
                <h2 className="text-3xl font-bold">
                  KSh {selectedPackage.price.toLocaleString()}
                </h2>
                <p className="text-sm font-bold">WHAT YOU WILL GET:</p>
                <ul className="space-y-2 bg-bg rounded-md p-2">
                  {selectedPackage.features.map((feature, i) => (
                    <li key={i}> <span><i className="ri-checkbox-circle-fill text-yellow-500"></i></span> {feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-4">
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
                  <i onClick={onClose} className="ri-close-large-line text-2xl text-yellow-500 font-bold cursor-pointer"></i>
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
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />{" "}
                  <input
                    type="number"
                    placeholder="Phone Number"
                    value={formData.phone}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  {errors.number && (
                    <p className="text-red-500 text-sm">{errors.number}</p>
                  )}
                  <input
                    type="text"
                    placeholder="National"
                    value={formData.nation}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) =>
                      setFormData({ ...formData, nation: e.target.value })
                    }
                  />
                  {errors.National && (
                    <p className="text-red-500 text-sm">{errors.National}</p>
                  )}
                  <input
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                  {errors.Age && (
                    <p className="text-red-500 text-sm">{errors.Age}</p>
                  )}
                  <input
                    type="text"
                    placeholder="goal"
                    value={formData.goals}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) =>
                      setFormData({ ...formData, goals: e.target.value })
                    }
                     />

                  {errors.goal && (
                    <p className="text-red-500 text-sm">{errors.goal}</p>
                  )}
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="p-2 rounded-md bg-lightBg"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                  
                </form>
                <button
                    onClick={payWithPaystack}
                    className="bg-button text-white px-6 py-3 w-full mt-4 font-bold"
                  >
                    PAY KSh {selectedPackage.price.toLocaleString()}
                  </button>
                  <p
                    className="mt-4 cursor-pointer "
                  >
                   Already have account?{" "} <span className="font-bold text-button cursor-pointer underline"> sign in </span>
                  </p>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </>
  );
}
