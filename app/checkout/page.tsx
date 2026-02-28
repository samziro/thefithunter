"use client";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function CheckoutPage() {

    const payWithPaystack = async () => {
    
    const saveRes = await fetch("/api/save-client-details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!saveRes.ok) {
      alert("Failed to save client details");
      return;
    }

    const reference = `fit_${Date.now()}`;

    

    const saveData = await saveRes.json();

    if (!saveData.success) {
      alert("Failed to save client details");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: FormData.email,
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="bg-button p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              AI Productivity & Digital Workflows
            </h1>
            <p className="text-gray-100 mt-2 text-sm">
              Use ChatGPT to work faster, create better, and earn more
            </p>

            <div className="mt-6">
              <h2 className="text-3xl font-bold text-white">
                KES 2,490
              </h2>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold text-gray-100 tracking-wider">
                WHAT YOU'LL GET:
              </p>

              <ul className="mt-4 space-y-3">
                {["Lifetime access", "Certificate", "Resources", "Support"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="text-white p-1 rounded-full">
                        <i className="ri-checkbox-circle-fill"></i>
                      </span>
                      <span className="text-gray-100">{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t mt-10 text-sm text-gray-100 flex items-center justify-between">
            <span>M-Pesa</span>
            <span>Card</span>
            <span>Secure</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 bg-lightBg">
          {/* Signed in */}
          <div className="bg-orange-100 text-button px-4 py-3 rounded-lg text-sm mb-6">
            Signed in as <strong>samuelziro76@gmail.com</strong>
          </div>

          <h2 className="text-xl font-bold text-white">
            Confirm & Pay
          </h2>
          <p className="text-sm text-gray-100 mb-6">
            Review and proceed to payment
          </p>

          {/* User Info */}
          <div className="space-y-4 mb-6 ">
            <div className="flex items-center gap-3 text-gray-100">
              <i className="ri-user-line"></i>
              <span>samuel ziro</span>
            </div>

            <div className="flex items-center gap-3 text-gray-100">
              <i className="ri-mail-line"></i>
              <span>samuelziro76@gmail.com</span>
            </div>
          </div>

          

          {/* Product */}
          <div className="mt-6 border-t pt-6 space-y-3 text-sm">
            <div className="flex justify-between text-gray-100">
              <span>AI Productivity & Digital Workflows</span>
              <span>KES 2,490</span>
            </div>

            <div className="flex justify-between font-semibold text-white text-base pt-2 border-t">
              <span>Total</span>
              <span>KES 2,490</span>
            </div>
          </div>

          {/* Pay Button */}
          <button className="w-full mt-6 bg-button hover:button-hover transition text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg">
            onClick={payWithPaystack}
            <i className="ri-lock-2-line"></i>
            Pay KES 2,490
          </button>

          {/* Footer */}
          <div className="mt-6 text-xs text-gray-100 text-center space-y-2">
            <p>Secure Checkout • Paystack</p>
            <p className="cursor-pointer hover:underline">
              Need help? Chat on WhatsApp
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute bottom-6 text-xs text-gray-500 text-center">
        Payments processed securely by Paystack · Tera Creations
        <div className="mt-1 space-x-4">
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Refunds</span>
        </div>
      </div>
    </div>
  );
}