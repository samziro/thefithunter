import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const opensans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const GA_ID = "G-N6TV3T6VDR";
const META_PIXEL_ID = "PASTE_META_PIXEL_ID";
const TIKTOK_PIXEL_ID = "PASTE_TIKTOK_PIXEL_ID";

export const metadata: Metadata = {
  title: {
    default: "Personal Trainer in Watamu, Kenya | Fit Hunter",
    template: "%s | Fit Hunter",
  },
  description:
    "Professional personal trainer in Watamu, Kenya. Affordable one-on-one sessions, meal plans, workout programs and online coaching.",
  metadataBase: new URL("https://thefithunter.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">

      {/* ================= GOOGLE ANALYTICS ================= */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>

      {/* ================= META PIXEL ================= */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* ================= TIKTOK PIXEL ================= */}
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;
            var ttq=w[t]=w[t]||[];
            ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
            ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
            for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
            ttq.load=function(e){
              var i="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{};
              ttq._i[e]=[];
              var o=d.createElement("script");
              o.type="text/javascript";
              o.async=true;
              o.src=i+"?sdkid="+e+"&lib="+t;
              var a=d.getElementsByTagName("script")[0];
              a.parentNode.insertBefore(o,a);
            };
            ttq.load('${TIKTOK_PIXEL_ID}');
            ttq.page();
          }(window, document, 'ttq');
        `}
      </Script>

      {/* ================= PAYSTACK ================= */}
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
      />

      {/* ================= GLOBAL EVENTS ================= */}
      <Script id="global-events" strategy="afterInteractive">
        {`
          window.trackWhatsapp = function(){
            if(window.gtag) gtag('event','contact',{method:'whatsapp'});
            if(window.fbq) fbq('track','Contact');
            if(window.ttq) ttq.track('Contact');
          }

          window.trackPurchase = function(amount){
            if(window.gtag) gtag('event','purchase',{value:amount,currency:'KES'});
            if(window.fbq) fbq('track','Purchase',{value:amount,currency:'KES'});
            if(window.ttq) ttq.track('CompletePayment',{value:amount,currency:'KES'});
          }
        `}
      </Script>

      <body
        className={`${montserrat.variable} ${opensans.variable} antialiased bg-[bg] text-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-yellow-600 focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to main content
        </a>

        <div className="flex min-h-dvh flex-col">
          <header />

          <main id="main-content" className="flex-1">
            {children}
          </main>

          <footer />
        </div>
      </body>
    </html>
  );
}
