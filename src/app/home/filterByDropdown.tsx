import React from 'react'
import { ChevronDown } from 'lucide-react'

export const FilterByDropdown = () => {
  return (
    <div className='w-[25%]'>
        <button
            className="flex w-full justify-between items-center bg-white h-full border text-sm px-3 rounded-md font-inter"
        >
        <span>Filter By: Name</span> <ChevronDown />
        </button>
    </div>
  )
}
