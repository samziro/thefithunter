'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Head from "next/head";
import { ReactNode } from 'react';

const features = [
  {
    icon: 'ri-fire-line',
    title: 'Passion for Fitness',
    description: 'Fitness is my lifestyle. Every program comes from a real love for training and helping people reach their full potential.',
  },
  {
    icon: 'ri-brain-line',
    title: 'Progressive Approach',
    description: 'Modern, science-based methods that adapt to your body, goals, and lifestyle—no outdated routines or guesswork.',
  },
  {
    icon: 'ri-service-line',
    title: 'Strong Client Bonds',
    description: 'I build trust and real connections to keep you motivated and enjoying the journey for faster, lasting results.',
  },
  {
    icon: 'ri-medal-line',
    title: 'Proven Experience',
    description: '11 years in fitness • 5+ years as a professional personal trainer • 100+ people transformed with strength and confidence.',
  },
];

const programHighlights = [
  'Custom plans for muscle gain, fat loss, or overall health',
  'Personalized nutrition guidance included',
  'Motivating support with empathy and expertise',
  'Flexible sessions: in-person (your location) or online',
];

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ href, children, className = '' }) => (
  <Link
    href={href}
    className={`p-4 md:px-8 md:py-4  text-lg font-semibold transition-colors  ${className}`}
  >
    {children}
  </Link>
);

export default function Home() {
  return (
      <>
            <Head>
        <title>Personal Trainer Watamu Kenya | Affordable Fitness Coaching - Fit Hunter</title>
        <meta
          name="description"
          content="Professional personal trainer in Watamu, Kenya offering affordable one-on-one sessions, strength training, weight loss programs, and online coaching at your preferred location. Build strength and confidence starting."
        />
        <meta
          name="keywords"
          content="personal trainer Watamu, fitness coach Kenya, affordable personal trainer Watamu, weight loss trainer Watamu, strength training Watamu, online personal training Kenya, fitness training Watamu Kenya, workout programs trainer in Kenya."
        />
      </Head>
    <div className="min-h-dvh">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-dvh flex items-center justify-center text-textSecondary bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/about.webp')`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6  leading-tight">
             Preying On Fitness Goals
            <span className="block text-button">One Rep at a Time</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Your professional personal trainer in Watamu, Kenya — offering affordable,personal coaching, workout-programs(home or gym workouts) and mealplans that build strength and confidence.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="mailto:1thefithunter@gmail.com" className="px-4 py-2 md:px-8 md:py-4  text-lg font-semibold transition-colors  text-base bg-button text-textSecondary hover:bg-buttonHover flex items-center justify-center">
              Book a Session
            </a>
            <CTAButton href="/programs" className="text-base border-2 border-textSecondary text-textSecondary hover:bg-textSecondary hover:text-[#292929]">
              View Programs
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Why Choose Fit Hunter */}
      <section className="py-20 text-textSecondary bg-lightBg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 ">Why Choose Fit Hunter?</h2>
            <p className="text-lg md:text-xl text-textMain font-inter">The home of real results in Watamu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-bg p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${feature.icon} text-3xl text-yellow-600`} />
                </div>
                <h3 className="text-xl font-bold mb-4 ">{feature.title}</h3>
                <p className="text-textMain leading-relaxed text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Showcase */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-textSecondary mb-4 ">Our Fitness Programs</h2>
            <p className="text-lg md:text-xl text-textMain leading-relaxed">
              Personalized workout programs designed for your lifestyle.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row gap-12">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-bold text-textSecondary mb-6 ">
                Effective Training That Fits Your Life
              </h3>
              <div className="space-y-4 mb-8">
                {programHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <i className="ri-checkbox-circle-fill text-button text-2xl mt-0.5 flex-shrink-0" />
                    <span className="text-lg text-textMain leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <CTAButton href="/programs" className="bg-button text-textSecondary hover:bg-buttonHover">
                Explore All Programs
              </CTAButton>
            </div>
            <div className="order-1 lg:order-2">
              <Image
                src="/mike.webp"
                alt="Fit Hunter personal trainer leading a session in Watamu, Kenya"
                width={400}
                height={500}
                className=" shadow-2xl "
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-lightBg ">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6  text-textSecondary">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-textMain leading-relaxed">
            Get a consultation with Fit Hunter in Watamu today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:1thefithunter@gmail.com"
              className="bg-textSecondary text-button px-8 py-4  text-lg font-semibold hover:bg-gray-100 transition-colors "
            >
              Book Consultation
            </a>
            <a
              href="tel:+254748679264"
              className="border-2 border-textSecondary text-textSecondary px-8 py-4 text-lg font-semibold hover:bg-textSecondary hover:text-yellow-600 transition-colors "
            >
              Call +254 748 679 264
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
      </>
  );
}
