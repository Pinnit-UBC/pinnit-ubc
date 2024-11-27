"use client";
import React, { useState } from 'react';
import { MapPin, MonitorPlay } from "lucide-react";
import OnlineEventInfo from './onlineEventInfo';
import VenueEventInfo from './venueEventInfo';

interface eventDetailsLocationProps {
    addEventsFormData: FormData
}

const EventDetailsLocation: React.FC<eventDetailsLocationProps> = ({ addEventsFormData }) => {
    const [isEventLocationOnline, setIsEventLocationOnline] = useState<boolean>(false)

    return (
        <div className='w-full flex flex-col py-5'>
            <h1 className='text-2xl font-semibold font-inter py-0.5'>Where is your event located?</h1>
            <div className="flex cursor-text float-left py-2">
                <button
                    className={`flex px-8 py-1.5 ${(!isEventLocationOnline) ? 'bg-[#556cd6] text-white' : 'bg-slate-100 hover:bg-slate-300'} rounded-l-md duration-200 trasnition-all`}
                    onClick={() => setIsEventLocationOnline(false)}
                >
                    <MapPin /> <span className='font-inter pl-3'>Venue</span>
                </button>
                <button
                    className={`flex px-8 py-1.5 ${(isEventLocationOnline) ? 'bg-[#556cd6] text-white' : 'bg-slate-100 hover:bg-slate-300'} rounded-r-md duration-200 trasnition-all`}
                    onClick={() => setIsEventLocationOnline(true)}
                >
                    <MonitorPlay /> <span className='font-inter pl-3'>Online</span>
                </button>
            </div>
            {(isEventLocationOnline) ?
                <OnlineEventInfo isEventLocationOnline={isEventLocationOnline} addEventsFormData={addEventsFormData}/>
                :
                <VenueEventInfo isEventLocationOnline={isEventLocationOnline} addEventsFormData={addEventsFormData}/>}
        </div>
    )
}

export default EventDetailsLocation;
