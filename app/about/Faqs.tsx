'use client';

import Title from '@/components/Title';
import React from 'react';

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question: 'What services does Fit Hunter offer?',
    answer:
      'I provide personalized one-on-one training, workout programs, meal plans and online coaching—all tailored to help you reach your fitness goals with effective, evidence-based plans.',
  },
  {
    question: 'How much do the programs cost?',
    answer:
      'Prices vary by type: One-on-one sessions start at KSh 4,500, nutrition guidance at ksh 11,500, workout programs at ksh 3,000 per month and online packages from KSh 2,500 per session. Contact me for custom quotes.',
  },
  {
    question: 'Where are the sessions held?',
    answer:
      'Based in Watamu, Kenya, with no fixed location—I come to you! Choose your home or any gym that suits you for motivation.',
  },
  {
    question: 'How can I book a session?',
    answer:
      'Book easily through the website for a free consultation, select a program, or reach out via WhatsApp or email for personalized help.',
  },
  {
    question: 'What makes Fit Hunter unique?',
    answer:
      'With 5+ years as a professional trainer, I bring a passion for fitness and a growth mindset, creating unique, adaptive workouts that build real confidence and results.',
  },
];

const FaqSection: React.FC = () => (
  <section className="py-12 p-6 bg-lightBg">
    <Title heading="Frequently Asked Questions" />
    <div className="space-y-6 max-w-4xl mx-auto mt-8">
      {faqs.map((faq, index) => (
        <div key={index} className="pb-4 border-b border-[#4a4a4a]">
          <h3 className="font-semibold text-textSecondary mb-2 text-lg ">
            {index + 1}. {faq.question}
          </h3>
          <p className="text-textMain text-base leading-relaxed">{faq.answer}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FaqSection;
