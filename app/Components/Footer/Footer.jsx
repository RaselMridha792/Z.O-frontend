"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="font-sans">
      {/* ===== Newsletter CTA ===== */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#5B2EFF] via-[#6A2BBF] to-[#A31D7E] py-20 text-center text-white">
        {/* subtle dots */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] [background-size:18px_18px]" />

        <div className="relative z-10 px-4">
          <h5 className="text-sm tracking-[0.2em] uppercase mb-4 opacity-90">
            Subscribe to Newsletter
          </h5>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8">
            Want Something Extra?
          </h2>

          <Link
            href="#"
            className="inline-block rounded-xl bg-[#FF1F8F] px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#ff3aa0] transition"
          >
            Register Soon!
          </Link>
        </div>
      </div>

      {/* ===== Footer Bottom ===== */}
      <div className="bg-[#14142B] text-white/70 text-center px-4 py-14">
        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            {
              icon: FaFacebookF,
              url: "https://www.facebook.com/FaatihaAayatOfficial/",
            },
            {
              icon: FaYoutube,
              url: "https://www.youtube.com/@FaatihaAayat",
            },
            {
              icon: FaInstagram,
              url: "https://www.instagram.com/faatiha.aayat/",
            },
            {
              icon: FaXTwitter,
              url: "https://x.com/faatihaaayat",
            },
            {
              icon: FaLinkedinIn,
              url: "https://www.linkedin.com/in/faatihaaayat/",
            },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-[#5B2EFF] transition"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>

        {/* Policy Menu */}
        <nav className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <Link href="/privacyPolicy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <Link
            href="/tramsAndCondition"
            className="hover:text-white transition"
          >
            Terms & Condition
          </Link>
          <Link href="/cookie-policy" className="hover:text-white transition">
            Cookie Policy
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} Zero Olympiad. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
