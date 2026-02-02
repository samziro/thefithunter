'use client';

import Image from 'next/image';
import Link from 'next/link';

interface SocialLink {
  href: string;
  icon: string;
  label: string; // For accessibility
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      href: 'https://www.facebook.com/share/19vKATkcoR/?mibextid=wwXIfr',
      icon: 'ri-facebook-circle-fill',
      label: 'Facebook',
    },
    {
      href: 'https://www.instagram.com/the.fithunter?igsh=ejNsNjFtcm9sMHIz',
      icon: 'ri-instagram-fill',
      label: 'Instagram',
    },
    {
      href: 'https://www.youtube.com/@the.fit.hunter',
      icon: 'ri-youtube-fill',
      label: 'YouTube',
    },
    {
      href: 'https://wa.me/254748679264',
      icon: 'ri-whatsapp-fill',
      label: 'WhatsApp',
    },
    {
      href: 'https://www.tiktok.com/@the.fithunter?_r=1&_t=ZM-92BhU4TBlV2',
      icon: 'ri-tiktok-fill',
      label: 'TikTok',
    },
  ];

  return (
    <footer className="text-textSecondary py-12 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/logo.webp"
                alt="Fit Hunter Logo - Personal Trainer in Watamu, Kenya"
                width={100}
                height={100}
                className="rounded-full"
                loading="lazy"
              />
            </div>
            <p className="text-textMain text-sm leading-relaxed">
              Fit Hunter is your go-to personal trainer in Watamu, Kenya. I provide tailored fitness sessions—including one-on-one and Online training, to help you reach your health goals simply and effectively.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-textMain hover:text-button transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-textMain hover:text-button transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-textMain hover:text-button transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-textMain hover:text-button transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <i className="ri-map-pin-line text-textSecondary text-xl"></i>
                <span className="text-textMain">Watamu, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-phone-line text-textSecondary text-xl"></i>
                <span className="text-textMain">+254 748 679 264</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-time-line text-textSecondary text-xl"></i>
                <span className="text-textMain">Flexible hours: Morning to evening sessions available</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center hover:text-button transition-colors duration-300"
                  aria-label={link.label}
                >
                  <i className={`${link.icon} text-textSecondary text-3xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#292929] mt-8 pt-8 text-center text-sm text-textMain">
          <p>&copy; {currentYear} FIT HUNTER. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
