"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "signin" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("signin");


  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nation: "",
    age: "",
    goal: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (mode === "signin") {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push(redirect);
  }

  if (mode === "signup") {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push(redirect);
  }
};
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center text-white">
        <Image
          src="/about.webp"
          alt="Hero"
          fill
          className="object-cover"
        />

        <div className="relative z-10 px-16 max-w-lg">
          <h1 className="text-4xl font-bold mb-10">FIT HUNTER</h1>

          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/20 text-sm mb-8">
            ✨ Personal trainer watamu.
          </span>

          <h2 className="text-5xl font-bold leading-tight">
            GET FIT <br /> GAIN CONFIDENCE.
          </h2>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-bg px-6 py-12">
        <div className="w-full max-w-md">

          <Link
            href="/"
            className="flex items-center text-sm text-gray-100 mb-6 hover:underline"
          >
            ← Back to Home
          </Link>

          <h2 className="text-3xl font-bold text-white">
            {mode === "signin"
              ? "Welcome Back"
              : "Create Your Account"}
          </h2>

          <p className="text-gray-100 mt-2 mb-6">
            {mode === "signin"
              ? "Log in to continue your journey"
              : "Start your fitness journey today"}
          </p>

          {/* Tabs */}
          <div className="flex bg-white rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode("signin")}
              className={`w-1/2 py-2 rounded-lg font-medium transition ${
                mode === "signin"
                  ? "bg-button text-white shadow"
                  : "text-button"
              }`}
            >
              Sign In
            </button>

            <button
              onClick={() => setMode("signup")}
              className={`w-1/2 py-2 rounded-lg font-medium transition ${
                mode === "signup"
                  ? "bg-button text-white shadow"
                  : "text-button"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <>
                <InputField
                  label="Full Name"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="071 234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <InputField
                  label="Nation"
                  name="nation"
                  placeholder="Kenya"
                  value={formData.nation}
                  onChange={handleChange}
                />

                <InputField
                  label="Age"
                  name="age"
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={handleChange}
                />

                <InputField
                  label="Fitness Goals"
                  name="goal"
                  placeholder="Lose 10kg"
                  value={formData.goal}
                  onChange={handleChange}
                />
              </>
            )}

            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full mt-4 bg-button hover:bg-button-hover transition text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              {mode === "signin" ? "Log In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Reusable Input Component */
function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-100">
        {label}
      </label>
      <div className="mt-1 flex items-center border rounded-xl px-3 py-3 bg-white">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="w-full outline-none bg-transparent"
        />
      </div>
    </div>
  );
}