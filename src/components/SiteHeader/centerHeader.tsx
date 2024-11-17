"use client";
import React from 'react'
import { Smartphone } from "lucide-react"
import Link from "next/link"

export default function CenterHeader() {
  return (
    <div className="flex justify-center items-center gap-2 text-[#FFFFFF]">
        <Link href="/"> <Smartphone /> </Link>
        <Link href="/"> <span className='underline'>Click here to subscribe to the UBC Events Newsletter!</span></Link>
    </div>
  )
}
