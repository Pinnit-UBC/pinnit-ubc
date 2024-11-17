import React from 'react'
import Link from "next/link"

interface HamburgerComponentProps {
    isHamburgerOpen: Boolean;
  }

const HamburgerMenu: React.FC<HamburgerComponentProps> = ({isHamburgerOpen}) => {
  return (
    <div 
        className={`absolute z-50 top-0 left-0 h-screen w-1/6 bg-[#3c3b3b] text-white rounded-r-lg border-[#555555] p-4 transition-all transform ${isHamburgerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <ul>
          <li><Link href="/" className="hamburger-menu-item">Home</Link></li>
          <li><Link href="/" className="hamburger-menu-item">Clubs & Organization</Link></li>
          <li><Link href="/add-event" className="hamburger-menu-item">Add Events</Link></li>
          <li><Link href="/" className="hamburger-menu-item">Feedback & Suggestions</Link></li>
          <li><Link href="/" className="hamburger-menu-item">Join the Team!</Link></li>
          <li><Link href="/" className="hamburger-menu-item">Follow Us!</Link></li>
        </ul>
      </div>
  )
}

export default HamburgerMenu;
