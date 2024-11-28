"use client";
import React, {useState} from 'react';

interface eventDetailsGeneralProps {
    addEventsFormData: FormData
}

const EventDetailsGeneral: React.FC<eventDetailsGeneralProps> = ({ addEventsFormData }) => {
    const [eventNameValue, setEventNameValue] = useState('')
    const [organizationNameValue, setOrganizationNameValue] = useState<string>('')
    const [eventDescriptionValue, setEventDescriptionValue] = useState<string>('')

    const updateAddEventsFormData = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        addEventsFormData.set(event.target.name, event.target.value)
    }
    
  return (
    <div>
        <div className='w-full flex flex-col pb-5'>
                <h1 className='text-2xl font-semibold font-inter py-0.5'>What is the name of your event?</h1>
                <p className='text-xs font-inter py-0.5'>Enter the name of your event, your organizations name and a quick description here. This information will be used as the headline to get students attention -- make sure it stands out!</p>
            </div>
            <div className="w-full py-2">
                <div className="relative">
                    <input
                        id="event-name-field"
                        required
                        name="eventName"
                        onChange={(e) => { 
                            updateAddEventsFormData(e) 
                            setEventNameValue(e.target.value)
                        }}
                        className="peer/event-name w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                    />
                    <label
                        htmlFor="event-name-field"
                        className={`absolute cursor-text bg-white px-1 text-slate-400 text-sm duration-200 transition-all transform origin-left peer-focus/event-name:-top-1.5 peer-focus/event-name:left-2.5 peer-focus/event-name:text-xs peer-focus/event-name:text-slate-400 peer-focus/event-name:scale-90 ${(eventNameValue === '') ? 'left-2.5 top-2.5' : "-top-1.5 left-2.5 text-xs text-slate-400 scale-90"}`}
                    >
                        Event Name<span className="text-red-400">*</span>
                    </label>
                </div>
            </div>
            <div className="w-full py-2">
                <div className="relative">
                    <input
                        id="organization-name-field"
                        required
                        name="organizationName"
                        onChange={(e) => { 
                            updateAddEventsFormData(e) 
                            setOrganizationNameValue(e.target.value)
                        }}
                        className="peer/organization-name w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                    />
                    <label
                        htmlFor="organization-name-field"
                        className={`absolute cursor-text bg-white px-1 text-slate-400 text-sm duration-200 transition-all transform origin-left peer-focus/organization-name:-top-1.5 peer-focus/organization-name:left-2.5 peer-focus/organization-name:text-xs peer-focus/organization-name:text-slate-400 peer-focus/organization-name:scale-90 ${(organizationNameValue === '') ? 'left-2.5 top-2.5' : "-top-1.5 left-2.5 text-xs text-slate-400 scale-90"}`}
                    >
                        Organization Name<span className="text-red-400">*</span>
                    </label>
                </div>
            </div>
            <div className="w-full py-2">
                <div className="relative">
                    <textarea
                        id="event-description-field"
                        name="eventDescription"
                        onChange={(e) => { 
                            updateAddEventsFormData(e) 
                            setEventDescriptionValue(e.target.value)
                        }}
                        className="peer/event-description resize-none w-full h-24 bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                    />
                    <label
                        htmlFor="event-description-field"
                        className={`absolute cursor-text bg-white px-1 text-slate-400 text-sm duration-200 transition-all transform origin-left peer-focus/event-description:-top-1.5 peer-focus/event-description:left-2.5 peer-focus/event-description:text-xs peer-focus/event-description:text-slate-400 peer-focus/event-description:scale-90 ${(eventDescriptionValue === '') ? 'left-2.5 top-2.5' : "-top-1.5 left-2.5 text-xs text-slate-400 scale-90"}`}
                    >
                        Event Description
                    </label>
                </div>
            </div>
    </div>
  )
}

export default EventDetailsGeneral;
