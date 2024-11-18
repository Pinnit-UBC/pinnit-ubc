import React from 'react'
import LeftHeader from './leftHeader';
import CenterHeader from './centerHeader';
import RightHeader from './rightHeader';

export default function SiteHeader(){
  return (
    <nav className="top-0 backdrop-blur-sm border-b w-full bg-[#4b4a4a]">
        <div className="flex justify-between h-16 px-4 w-full">
          <LeftHeader />
          <CenterHeader />
          <RightHeader />
        </div>
    </nav>
  )
}

