import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "./AboutHero";
import OurStory from "./OurStory";
import WhyChooseUs from "./WhyChooseUs";
import TeamSection from "./TeamSection";
import Location from "./Location";
import Faqs from "./Faqs";
import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Fit Hunter | Certified Personal Trainer in Watamu, Kenya</title>
        <meta
          name="description"
          content="Learn about Fit Hunter, your professional personal trainer in Watamu, Kenya. With 5+ years experience, we offer affordable fitness coaching, weight loss programs, and strength training at your preferred location."
        />
        <meta
          name="keywords"
          content="personal trainer Watamu, fitness coach Kenya, about personal trainer Watamu, weight loss trainer Watamu, strength training Watamu, professional trainer Kenya, affordable fitness Watamu"
        />
      </Head>
    <div className="min-h-dvh ">
      <Header />
      <AboutHero />
      <OurStory />     
      <Location/>
      <WhyChooseUs />
      <TeamSection />
      <Faqs/>
      <Footer />
    </div>
    </>
  );
}
