"use client";
import React, { Dispatch, SetStateAction } from 'react'

interface TextSearchedProps {
  setTextSearched: Dispatch<SetStateAction<String>>
  handleSearch: Dispatch<SetStateAction<String>>
}

const TextSearch: React.FC<TextSearchedProps> = ({setTextSearched, handleSearch}) => {
  const updateSearchedText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearched(e.target.value)
  }

  const sendSearchText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleSearch()
    }
  }

  return (
    <div className='w-[50%] flex border border-slate-200 rounded-md h-[42px]'>
      <input
        id="date-search-field"
        name="eventDate"
        className="w-full h-[42px] bg-transparent text-slate-700 text-sm px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
        placeholder='Search...'
        onChange={(e) => updateSearchedText(e)}
        onKeyDown={(e) => sendSearchText(e)}
      />
      <button
        className='peer/search-events bg-[#4A90E2] duration-200 ease rounded-md px-2 py-1 m-1'
        onClick={() => handleSearch()}
      >
        <div className='transition duration-200 ease text-[#FFFFFF] font-inter'>Search</div>
      </button>
    </div>
  )
}

export default TextSearch;