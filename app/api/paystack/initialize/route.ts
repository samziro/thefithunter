// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { reference } = await req.json();

//   const response = await fetch(
//     `https://api.paystack.co/transaction/verify/${reference}`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//       },
//     }
//   );

//   const data = await response.json();

//   if (data.data.status === "success") {
//     // ✅ mark order as paid in DB (optional)
//     return NextResponse.json({ success: true });
//   }

//   return NextResponse.json({ success: false }, { status: 400 });
// }

const payWithPaystack = async () => {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    router.push("/auth?redirect=/checkout");
    return;
  }

  const reference = `fit_${Date.now()}`;

  const saveRes = await fetch("/api/create-client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...formData,
      packageTitle: "Weight Loss Program",
      packagePrice: 2490,
      reference,
    }),
  });

  if (!saveRes.ok) {
    alert("Failed to save client");
    return;
  }

  const handler = window.PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    email: data.user.email,
    amount: 2490 * 100,
    currency: "KES",
    ref: reference,

    callback: async function () {
      const verifyRes = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      const result = await verifyRes.json();

      if (result.success) {
        window.location.href = "/client/dashboard";
      } else {
        alert("Payment verification failed.");
      }
    },

    onClose: function () {
      console.log("Payment closed");
    },
  });

  handler.openIframe();
};