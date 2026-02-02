'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function TeamSection() {
  return (
    <section className="py-12 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-textSecondary mb-4 ">
            Meet Your Trainer
          </h2>
          <p className="text-lg md:text-xl text-textMain max-w-3xl mx-auto  leading-relaxed">
            I &apos;m dedicated to your fitness journey, with expert guidance to help you build strength and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              width={800}
              height={800}
              src="/about.webp"
              alt="Fit Hunter personal trainer leading a fitness session in Watamu, Kenya"
              className="w-full h-auto object-cover shadow-xl"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-textSecondary mb-6 ">
              Passionate About Your Success
            </h3>
            <div className="space-y-6 text-textMain  text-base leading-relaxed">
              <p>
                With 11 years in fitness and 5+ years as a professional personal trainer in Watamu, Kenya, I bring proven expertise to every session.
              </p>
              <p>
                From your first assessment to ongoing motivation, my focus is on safe, effective plans—like one-on-one training or online coaching—that get real results.
              </p>
              <p>
                I believe in empathy and support to help you achieve lasting health and confidence.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-button/20  border-2 border-button/30">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-user-heart-line text-button text-xl"></i>
                </div>
                <div className="font-semibold text-button ">Expert Guidance</div>
                <div className="text-sm text-button ">Tailored to you</div>
              </div>
              <div className="text-center p-4 bg-button/20  border-2 border-button/30">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-time-line text-button text-xl"></i>
                </div>
                <div className="font-semibold text-button ">Flexible Scheduling</div>
                <div className="text-sm text-button ">Fits your life</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-button/20  border-2 border-button/30 text-textSecondary py-12 px-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 ">Ready to Start?</h3>
            <p className="text-lg md:text-xl mb-8 text-slate-100  leading-relaxed">
              Join 100+ happy clients who &apos;ve transformed with Fit Hunter in Watamu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/programs" className="bg-textSecondary text-button px-8 py-3 font-semibold  hover:bg-gray-100 transition-colors ">
                View Programs
              </Link>
              <a href="mailto:1thefithunter@gmail.com" className="border-2 border-white text-white px-8 py-3 font-semibold  hover:bg-white hover:text-button transition-colors ">
                Get Started
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-2 text-slate-100 ">
              <i className="ri-phone-line"></i>
              <a href="tel:0748679264"><span>+254 748 679 264</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
