// app/auth/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"; // your client

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectAfterLogin = searchParams.get("redirect") || "/client/dashboard";
  const packageTitle = searchParams.get("package");
  const priceKES = Number(searchParams.get("price")) || 0;

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    // add other fields if needed
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let user;

      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        user = data.user;

        // create profile
        await supabase.from("profiles").insert({
          id: user.id,
          full_name: form.fullName,
          phone: form.phone,
        });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        user = data.user;
      }

      // After success → go to payment summary
      if (packageTitle && priceKES > 0) {
        const params = new URLSearchParams({
          package: packageTitle,
          price: priceKES.toString(),
        });
        router.push(`/checkout?${params.toString()}`);
      } else {
        router.push(redirectAfterLogin);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </h1>

        <form onSubmit={handleAuth} className="space-y-5">
          {mode === "signup" && (
            <>
              <input name="fullName" placeholder="Full Name" onChange={handleChange} className="input" required />
              <input name="phone" placeholder="Phone Number" onChange={handleChange} className="input" />
            </>
          )}
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" required />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-600 text-black font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-60"
          >
            {loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          {mode === "login" ? "No account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="ml-2 text-yellow-500 hover:underline"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}