"use client";
import React, { Dispatch, SetStateAction, useState } from 'react'

interface DatePickerProps {
    setDateSearched: Dispatch<SetStateAction<String>>
}

const DatePicker: React.FC<DatePickerProps> = ({setDateSearched}) => {
    const [searchDate, setSearchDate] = useState<String>("")
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

    const handleSearchDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value == "") {
            setSearchDate("")
        } else {
            const dateTypeSearchDate = new Date(`${e.target.value}T00:00:00`)

            const searchDateDayName = daysOfWeek[dateTypeSearchDate.getDay()]
            const searchDateMonth = monthsOfYear[dateTypeSearchDate.getMonth()]
            const searchDateDay = String(dateTypeSearchDate.getDate())
            const searchDateYear = String(dateTypeSearchDate.getFullYear())
            setSearchDate(`${searchDateDayName} ${searchDateMonth} ${searchDateDay} ${searchDateYear}`)
        }

        setDateSearched(e.target.value)

    }

    return (
        <div className='relative w-[25%]'>
            <label
                htmlFor="date-search-field"
                className="absolute flex items-center top-1 left-1 bg-white w-3/4 h-[31px] text-sm px-2 rounded-md font-inter">
                {(searchDate !== "") ? searchDate : "All Dates"}
            </label>
            <input
                id="date-search-field"
                type='date'
                name="eventDate"
                onChange={(e) => handleSearchDateChange(e)}
                className="w-full h-[42px] bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
            />
        </div>
    )
}

export default DatePicker;