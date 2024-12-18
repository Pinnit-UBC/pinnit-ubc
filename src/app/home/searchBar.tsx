"use client";
import React, { useState } from 'react'
import DatePicker from './datePicker'
import TextSearch from './textSearch'
import FilterByDropdown from './filterByDropdown'

export const SearchBar = () => {
  const [filterBy, setFilterBy] = useState<String>("eventName")
  const [dateSearched, setDateSearched] = useState<String>("")
  const [textSearched, setTextSearched] = useState<String>("")

  const handleSearch = async () => {
    const searchURL = `http://localhost:3000/api/events?filterBy=${filterBy}&date=${dateSearched}&textSearch=${textSearched}`

    try {
      const response = await fetch(searchURL, {
        method: "GET"
      })

      const resJSON = await response.json()
      console.log(resJSON.searchedEvents)
    } catch (err) {
      alert("err")
      console.log(err)
    }

  }

  return (
    <div className='border border-2 border-red-500 py-10 px-40 flex gap-3'>
      <FilterByDropdown setFilterBy={setFilterBy} />
      <DatePicker setDateSearched={setDateSearched} />
      <TextSearch setTextSearched={setTextSearched} handleSearch={handleSearch} />
    </div>
  )
}
