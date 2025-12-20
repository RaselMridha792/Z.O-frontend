"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  // Outside click close
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute right-6 top-20 z-50">
      <div
        ref={modalRef}
        className="w-72 rounded-2xl border border-purple-600/40 bg-gradient-to-b from-[#1a0b2e] to-[#0b0418] p-4 shadow-2xl"
      >
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
            alt="profile"
            width={64}
            height={64}
            className="rounded-full border-2 border-purple-500 w-20 h-20 object-cover"
          />
          <h3 className="mt-3 font-semibold text-white">Md Shoriful Islam</h3>
          <p className="text-sm text-gray-400">Student ID: WEB10-1166</p>

          <Link
            href="/profile"
            className="mt-3 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
            onClick={onClose}
          >
            View Profile
          </Link>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-purple-800/40" />

        {/* Menu */}
        <ul className="space-y-1 text-sm">
          {[
            "My Classes",
            "Bookmark",
            "Helpdesk",
            "Ersa Chat Assistant",
            "Actionable Dashboard",
            "Leaderboard",
            "Announcement",
            "Conceptual Sessions",
            "Settings",
          ].map((item) => (
            <li
              key={item}
              className="cursor-pointer rounded-lg px-3 py-2 text-gray-300 hover:bg-purple-700/20 hover:text-white"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="mt-4 border-t border-purple-800/40 pt-3">
          <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
            Logout <span className="text-lg">↩</span>
          </button>
        </div>
      </div>
    </div>
  );
}
