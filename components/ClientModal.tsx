"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ClientModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ClientModal({ open, onClose }: ClientModalProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    goal: "",
    nationality: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const defaultEmail = "client@example.com";
      const defaultPass = "password123";

      if (form.email === defaultEmail && form.password === defaultPass) {
        localStorage.setItem("clientAuth", "true");
        router.push("/payment");
        return;
      }

      setError("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[black/70] backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-bg rounded-3xl overflow-hidden border border-white/10 shadow-2xl">

        {/* Header */}
        <div className="p-8 text-center border-b border-white/5">
          <Image src="/logo.webp" alt="Logo" width={60} height={60} className="mx-auto" />
          <h2 className="mt-4 text-2xl font-bold text-white">Client Access</h2>
          <p className="text-slate-400 text-sm mt-1">
            Register or login to access your fitness dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">

          {/* Personal Info */}
          <div>
            <h3 className="text-sm text-slate-400 mb-3">Personal Details</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <Input name="fullName" placeholder="Full Name" onChange={handleChange} />
              <Input name="age" placeholder="Age" onChange={handleChange} />
              <Input name="goal" placeholder="Fitness Goal" onChange={handleChange} />
              <Input name="nationality" placeholder="Nationality" onChange={handleChange} />
              <Input name="phone" placeholder="Phone Number" onChange={handleChange} />
            </div>
          </div>

          {/* Login */}
          <div>
            <h3 className="text-sm text-slate-400 mb-3">Account Login</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <Input name="email" type="email" placeholder="Email Address" onChange={handleChange} />
              <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
              <Input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-yellow-600 text-black font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* Reusable Input Component */
function Input({ placeholder, name, type = "text", onChange }: any) {
  return (
    <input
      name={name}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-lightBg rounded-xl border border-white/10 text-white placeholder-slate-200 focus:outline-none focus:border-yellow-500 transition"
    />
  );
}
