"use client";
import React, { useState } from 'react'

export const TextSearch = () => {
  const [searchedText, setSearchedText] = useState<String>("")

  const updateSearchedText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value)
  }

  const sendSearchText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      console.log(searchedText)
    }
  }

  return (
    <div className='w-[50%]'>
      <input
        id="date-search-field"
        name="eventDate"
        className="w-full h-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
        placeholder='Search...'
        onChange={(e) => updateSearchedText(e)}
        onKeyDown={(e) => sendSearchText(e)}
      />
    </div>
  )
}
