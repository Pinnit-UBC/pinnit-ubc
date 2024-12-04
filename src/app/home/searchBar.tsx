"use client";
import React, {useState} from 'react'
import DatePicker from './datePicker'
import TextSearch from './textSearch'
import { FilterByDropdown } from './filterByDropdown'

export const SearchBar = () => {
  const [filterBy, setFilterBy] = useState<String>("")
  const [dateSearched, setDateSearched] = useState<String>("")
  const [textSearched, setTextSearched] = useState<String>("")

  const handleSearch = () => {
    
  }

  return (
    <div className='border border-2 border-red-500 py-10 px-40 flex gap-3'>
        <FilterByDropdown />
        <DatePicker setDateSearched={setDateSearched}/>
        <TextSearch setTextSearched={setTextSearched}/>
    </div>
  )
}
