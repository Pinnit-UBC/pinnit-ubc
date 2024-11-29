import React from 'react'
import { DatePicker } from './datePicker'
import { TextSearch } from './textSearch'
import { FilterByDropdown } from './filterByDropdown'

export const SearchBar = () => {
  return (
    <div className='border border-2 border-red-500 py-10 px-36 flex'>
        <FilterByDropdown />
        <DatePicker />
        <TextSearch />
    </div>
  )
}
