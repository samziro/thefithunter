/* eslint-disable react/no-unescaped-entities */
'use client';

import Image from "next/image";

export default function OurStory() {
  return (
    <section className="py-12 bg-lightBg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-textSecondary mb-6 ">
              TRAINER BIO: Passion for Fitness in Watamu
            </h2>
            <div className="space-y-6 text-textMain  text-base leading-relaxed">
              <p>
                I started with a simple goal: Help people get fit and confident through personalized training, meal plans and workouts programs. As a personal trainer, I've built this from passion of fitness.
              </p>
              <p>
                Based in Watamu, I use years of experience to create safe, fun sessions—one-on-one coaching, outdoor training — that deliver real results.
              </p>
              <p>
                TRAINER MOTTO: "Preying on fitness goals, one rep at a time." It's more than words—it's how I support every client's journey to better health.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="text-center min-w-[80px]">
                <div className="text-3xl font-bold text-textSecondary ">5+</div>
                <div className="text-sm text-textMain ">Years of Experience</div>
              </div>
              <div className="text-center min-w-[80px]">
                <div className="text-3xl font-bold text-textSecondary ">100+</div>
                <div className="text-sm text-textMain ">Happy Clients</div>
              </div>
              <div className="text-center min-w-[80px]">
                <div className="text-3xl font-bold text-textSecondary ">100%</div>
                <div className="text-sm text-textMain ">Personalized Plans</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              width={400}
              height={400}
              src="/mike2.webp"
              alt="Fit Hunter personal trainer leading a session in Watamu, Kenya"
              className="w-full h-auto object-cover  shadow-xl"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 bg-button text-textMain p-4  shadow-xl">
              <div className="flex items-center space-x-3">
                <i className="ri-map-pin-line text-2xl"></i>
                <div>
                  <div className="font-semibold ">Based in</div>
                  <div className="text-sm font-inter">Watamu, Kenya</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
