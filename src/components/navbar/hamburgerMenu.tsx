"use client";
import React from "react";
import Link from "next/link";

interface HamburgerComponentProps {
  isHamburgerOpen: Boolean;
}

const HamburgerMenu: React.FC<HamburgerComponentProps> = ({
  isHamburgerOpen,
}) => {
  const screenWidth = window.screen.width;
  const translationDirectionOpen =
    screenWidth > 768 ? "translate-x-0" : "translate-y-0";
  const translationDirectionClose =
    screenWidth > 768 ? "-translate-x-full" : "-translate-y-full";

  return (
    <div
      className={`absolute z-50 top-0 left-0 bg-[#3c3b3b] text-white rounded-r-lg border-[#555555] p-4 transition-all transform ${
        isHamburgerOpen ? translationDirectionOpen : translationDirectionClose
      } ${screenWidth > 768 ? "h-screen w-1/6" : "w-full"}`}
    >
      <ul>
        <li>
          <Link href="/" className="hamburger-menu-item">
            Home
          </Link>
        </li>
        <li>
          <Link href="/organizations" className="hamburger-menu-item">
            Clubs & Organization
          </Link>
        </li>
        <li>
          <Link href="/add-event" className="hamburger-menu-item">
            Add Events
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hamburger-menu-item">
            Contact Us
          </Link>
        </li>
        <li>
          <Link href="/" className="hamburger-menu-item">
            Account
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HamburgerMenu;
