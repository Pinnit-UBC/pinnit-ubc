import React from 'react'
import LeftHeader from './leftHeader';
import CenterHeader from './centerHeader';
import RightHeader from './rightHeader';

export default function SiteHeader(){
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm border-b w-full bg-[#4b4a4a]">
        <div className="flex justify-between h-16 px-4 w-full">
          <LeftHeader />
          <CenterHeader />
          <RightHeader />
        </div>
    </header>
  )
}

