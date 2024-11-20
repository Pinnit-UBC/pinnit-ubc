"use client"
import React, { useState } from 'react'
import { MapPin, MonitorPlay } from "lucide-react"
import OnlineEventInfo from './onlineEventInfo'
import VenueEventInfo from './venueEventInfo'
import ImageUploadButton from './imageUploadButton'


export default function EventDetailsLocation() {
    const [isEventLocationOnline, setIsEventLocationOnline] = useState<boolean>(false)
  return (
    <div className='w-full flex flex-col py-5'>
    <h1 className='text-2xl font-semibold py-0.5'>Where is your event located?</h1>
    <div className="flex cursor-text float-left py-2">
        <button 
            className={`flex px-8 py-1.5 ${(!isEventLocationOnline) ? 'bg-[#556cd6] text-white' : 'bg-slate-100 hover:bg-slate-300'} rounded-l-md duration-200 trasnition-all`}
            onClick={() => setIsEventLocationOnline(false)}
        >
            <MapPin /> <span className='pl-2'>Venue</span>
        </button>
        <button 
            className={`flex px-8 py-1.5 ${(isEventLocationOnline) ? 'bg-[#556cd6] text-white' : 'bg-slate-100 hover:bg-slate-300'} rounded-r-md duration-200 trasnition-all`}
            onClick={() => setIsEventLocationOnline(true)}
        >
            <MonitorPlay /> <span className='pl-3'>Online</span>
        </button>
    </div>
    {(isEventLocationOnline) ? <OnlineEventInfo /> : <VenueEventInfo />}
    <ImageUploadButton />
</div>
  )
}
