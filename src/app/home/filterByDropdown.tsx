"use client";
import React, { Dispatch, SetStateAction, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FilterByDropdownProps {
  setFilterBy: Dispatch<SetStateAction<String>>
}

const FilterByDropdown: React.FC<FilterByDropdownProps> = ({setFilterBy}) =>{
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("Name")
  const filterByOptions = [
    {userView: "Name", eventObjField: "eventName"},
    {userView: "Club", eventObjField:"organizationName"},
    {userView: "Tags", eventObjField: "Tag"}
  ]


  return (
    <div className='w-[25%] relative'>
      <button
        className="flex w-full h-[42px] justify-between items-center bg-white border text-sm px-3 rounded-md font-inter"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>Filter By: {selectedOption}</span> {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isDropdownOpen &&
        <div className='w-full border border-slate-250 border-t-0 rounded-md'>
          <ul>
            {filterByOptions.map((item, i) => (
              <li
                key={i}
                className='border border-slate-250 border-t-0 py-2 px-1 font-inter text-sm'
                onClick={() => {
                  setSelectedOption(item.userView)
                  setIsDropdownOpen(false)
                  setFilterBy(item.eventObjField)
                }}
              >
                {item.userView}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}

export default FilterByDropdown;