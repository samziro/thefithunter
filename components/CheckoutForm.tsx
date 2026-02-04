"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function CheckoutForm() {
  const router = useRouter();

  const publicKey = "pk_test_148c8beaa23ffd37481f265f6831e09110e4e333";
  const amount = 1000000;

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onClose = () => {
    router.back();
  };

  const payWithPaystack = () => {
    if (!window.PaystackPop) {
      alert("Paystack not loaded");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!email || !fullName || !phone) {
      alert("Please fill all required fields");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount,
      currency: "KES",

      metadata: {
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: fullName },
          { display_name: "Age", variable_name: "age", value: age },
          { display_name: "Goal", variable_name: "goal", value: goal },
          { display_name: "Nationality", variable_name: "nationality", value: nationality },
          { display_name: "Phone", variable_name: "phone", value: phone },
        ],
      },

      callback: function (response: any) {
        console.log("Paystack Ref:", response.reference);

        // 👉 Normally create user in backend here

        router.push("/client/dashboard");
      },

      onClose: function () {
        alert("Transaction cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-md bg-bg rounded-lg shadow-2xl">
        <div className="p-8">

          <div className="text-center mb-6">
            <Image
              src="/logo.webp"
              alt="Fit Hunter Logo"
              width={64}
              height={64}
              className="mx-auto rounded-full"
            />

            <h3 className="mt-4 text-2xl font-bold text-white">
              Checkout
            </h3>

            <p className="mt-2 text-sm text-slate-200">
             Pay and access your dashboard instantly.
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

            
            <input placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} className="input" />
           
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="input" />

            
          
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-slate-500 text-white rounded-md"
              >
                Cancel
              </button>

              <button
                
                onClick={payWithPaystack}
                className="flex-1 px-6 py-3 bg-yellow-600 rounded-md text-black font-medium"
              >
                Pay Now
              </button>
            </div>

          </form>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          background: #292929;
          border: 1px solid #555;
          border-radius: 6px;
          color: white;
        }
      `}</style>
    </div>
  );
}
