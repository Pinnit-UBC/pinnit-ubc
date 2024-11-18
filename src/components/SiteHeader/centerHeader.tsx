"use client";
import React from 'react'
import { Bell } from "lucide-react"
import Link from "next/link"

export default function CenterHeader() {
    const screenWidth = window.screen.width
  return (
    <div className="flex justify-center items-center gap-2 text-[#FFFFFF]">
        <Link href="/" className='hidden md:flex'> <Bell size={(screenWidth >= 1024) ? 16: 12}/> </Link>
        <Link href="/"> <span className='underline hidden md:flex sm:text-xs lg:text-base text-center'>Subscribe to the UBC Events Newsletter!</span></Link>
    </div>
  )
}
