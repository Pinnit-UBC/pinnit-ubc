import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function AddEventsHeader() {
    return (
        <nav className="top-0 backdrop-blur-sm border-b w-full bg-white">
            <div className="flex justify-between h-16 px-4 w-full">
                <Link href="/" className="xs:flex items-center gap-4 hidden">
                    <Image
                        src='/Images/pinnitIcon.png'
                        alt="Pinnit Logo"
                        width={54}
                        height={54}
                        className="rounded-full border-red-500"
                    />
                    <span className="text-3xl text-[#000000] font-inter">Pinnit</span>
                </Link>
            </div>
        </nav>
    )
}
