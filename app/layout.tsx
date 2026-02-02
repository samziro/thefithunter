import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Head from "next/head";

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

const GA_ID = "G-N6TV3T6VDR"; // Google Analytics / Measurement ID
export const metadata: Metadata = {
  title: {
    default: " Personal Trainer in Watamu, Kenya | Fit Hunter",
    template: "%s | Personal Trainer Watamu - Fit Hunter",
  },
  description:
    "Profesional personal trainer in Watamu, Kenya. Affordable one-on-one sessions, workout programs, meal plans and online coaching to help you build strength and confidence.",
  keywords: [
    "personal trainer Watamu",
    "fitness coach Kenya",
    "beach workouts Watamu",
    "personal training Kilifi",
    "online fitness coaching Kenya",
    "strength training Watamu",
    "affordable personal trainer Kenya",
  ],
  authors: [{ name: "Fit Hunter", url: "https://thefithunter.com" }],
  creator: "Fit Hunter",
  publisher: "Fit Hunter",
  metadataBase: new URL("https://thefithunter.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fit Hunter | Personal Trainer in Watamu, Kenya",
    description:
      "Get fit with personalized training in Watamu. Meal plans, workout programs, and one-on-one sessions.",
    url: "https://thefithunter.com",
    siteName: "Fit Hunter",
    images: [
      {
        url: "/about.webp",
        width: 1200,
        height: 630,
        alt: "Fit Hunter personal trainer in Watamu, Kenya",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Trainer Watamu | Fit Hunter",
    description:
      "Professional trainer offering affordable workout programs, meal plans and custom fitness plans in Watamu, Kenya.",
    images: ["/logo.webp"],
    creator: "@The_Fithunter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />

        {/* Mobile friendly */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon & App Icons */}
        <link rel="icon" href="/logo.webp" />
        <link rel="apple-touch-icon" href="/logo.webp" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data: Local Business + Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Fit Hunter - Personal Trainer Watamu",
              description: "Professional personal trainer in Watamu, Kenya offering affordable one-on-one sessions, strength training, weight loss programs, and online coaching at your preferred location. Build strength and confidence starting today.",
              url: "https://thefithunter.com",
              telephone: "+254748679264",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jiwe-leupe",
                addressLocality: "Watamu",
                addressRegion: "Kilifi",
                postalCode: "80202",
                addressCountry: "KE",
              },
              image: "/logo.webp",
              priceRange: "KSh 2,000 - KSh 55,500",
              sameAs: [
                "https://www.youtube.com/@the.fit.hunter",
                "https://www.facebook.com/share/19vKATkcoR/?mibextid=wwXIfr",
                "https://www.instagram.com/the.fithunter?igsh=ejNsNjFtcm9sMHIz",
                "https://www.tiktok.com/@the.fithunter?_r=1&_t=ZM-92BhU4TBlV2",
               
              ],
              makesOffer: {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Personal Training Session",
                  image: "/logo.webp",
                  description: "Professional personal training sessions in Watamu, Kenya.",
                  brand: { "@type": "Brand", name: "Fit Hunter - Personal Trainer Watamu" },
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "KES",
                    price: "2000",
                    availability: "https://schema.org/InStock",
                  },
                },
              },
            }),
          }}
        />
      </Head>
      <body className={`${montserrat.variable} ${opensans.variable} bg-[bg]text-white antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-yellow-600 focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to main content
        </a>

        <div className="flex min-h-dvh flex-col">
          <header>{/* Header component will be rendered via page layout */}</header>

          <main id="main-content" className="flex-1">
            {children}
          </main>

          <footer>{/* Footer component will be rendered via page layout */}</footer>
        </div>
      </body>
    </html>
  );
}