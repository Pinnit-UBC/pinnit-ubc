"use client";
import React, { useEffect } from 'react';

interface eventDetailsTimeProps {
    addEventsFormData: FormData
}

const EventDetailsTime: React.FC<eventDetailsTimeProps> = ({ addEventsFormData }) => {
    const today = new Date();
    const todayFormatedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    useEffect(() => {
        addEventsFormData.append("eventDate", todayFormatedDate)
        addEventsFormData.append("eventStartTime", "5:00")
        addEventsFormData.append("eventEndTime", "9:00")
    }, [addEventsFormData])
    
    const updateAddEventsFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
        addEventsFormData.set(event.target.name, event.target.value)
    }
    
  return (
    <div className='w-full flex flex-col py-5'>
    <h1 className='text-2xl font-semibold font-inter py-0.5'>When does your event start and end?</h1>
    <div className="flex cursor-text float-left py-2">
        <div className="relative flex w-1/2 pr-2">
            <input
                id="date-field"
                type='date'
                required
                name="eventDate"
                onChange={(e) => {updateAddEventsFormData(e)}}
                defaultValue={todayFormatedDate}
                className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
            />
            <label
                htmlFor=""
                className={`absolute cursor-text bg-white px-1 -top-2 left-2 text-xs text-slate-400 scale-90 `}
            >
                Date<span className="text-red-400">*</span>
            </label>
        </div>
        <div className='flex w-1/2 pl-2 justify-center gap-2'>
            <div className="relative flex w-1/2">
                <input
                    type='time'
                    required
                    name="eventStartTime"
                    onChange={(e) => { updateAddEventsFormData(e)} }
                    defaultValue="17:00"
                    className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                />
                <label
                    htmlFor=""
                    className={`absolute cursor-text bg-white px-1 -top-2 left-2 text-xs text-slate-400 scale-90 `}
                >
                    Start Time<span className="text-red-400">*</span>
                </label>
            </div>
            <div className="relative flex w-1/2">
                <input
                    type='time'
                    required
                    name="eventEndTime"
                    onChange={(e) => { updateAddEventsFormData(e) }}
                    defaultValue="21:00"
                    className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                />
                <label
                    htmlFor=""
                    className={`absolute cursor-text bg-white px-1 -top-2 left-2 text-xs text-slate-400 scale-90 `}
                >
                    End Time<span className="text-red-400">*</span>
                </label>
            </div>
        </div>
    </div>
    
</div>
  )
}

export default EventDetailsTime;
