"use client";
import React, { useState, useEffect, useRef } from 'react'
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import HamburgerMenu from './hamburgerMenu';

export default function LeftHeader() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const hamburgerRef = useRef<HTMLDivElement>(null);

    const handleHamburger = (): void => {
        setIsOpen(!isOpen)
    }

    const handleClickOutside = (event: MouseEvent): void => {
        if (hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)) {
          setIsOpen(!isOpen);
        }
    };

    useEffect(() => {
        if (isOpen) {
          document.addEventListener('click', handleClickOutside);
        } else {
          document.removeEventListener('click', handleClickOutside);
        }
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [isOpen]);

  return (
    <div className="flex items-center gap-4">
        <div className='text-[#b9b9b9]' onClick={handleHamburger}>
            <MenuIcon size={32}/>
            <div ref={hamburgerRef}><HamburgerMenu isHamburgerOpen={isOpen}/></div>
        </div>
        <Link href="/" className="flex items-center gap-2">
        <Image
            src="/public/next.svg"
            alt="Pinnit Logo"
            width={32}
            height={32}
            className="rounded-full"
        />
        <span className="font-sans font-medium text-3xl text-[#FFFFFF]">Pinnit</span>
        </Link>
    </div>
  )
}