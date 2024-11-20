"use client"
import React, {useState} from 'react'

export default function EventDetailsGeneral() {
    const [eventNameValue, setEventNameValue] = useState('')
    const [organizationNameValue, setOrganizationNameValue] = useState<string>('')
    const [eventDescriptionValue, setEventDescriptionValue] = useState<string>('')
    
  return (
    <div>
        <div className='w-full flex flex-col pb-5'>
                <h1 className='text-2xl font-bold py-0.5'>What is the name of your event?</h1>
                <p className='text-xs font-medium py-0.5'>Enter the name of your event, your organizations name and a quick description here. This information will be used as the headline to get students attention -- make sure it stands out!</p>
            </div>
            <div className="w-full py-2">
                <div className="relative">
                    <input
                        id="event-name-field"
                        required
                        onChange={(e) => { setEventNameValue(e.target.value) }}
                        className="peer/event-name w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                    />
                    <label
                        htmlFor="event-name-field"
                        className={`absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm duration-200 transition-all transform origin-left peer-focus/event-name:-top-1.5 peer-focus/event-name:left-2.5 peer-focus/event-name:text-xs peer-focus/event-name:text-slate-400 peer-focus/event-name:scale-90 ${(eventNameValue === '') ? '' : "-top-1.5 left-2.5 text-xs text-slate-400 scale-90"}`}
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
                        onChange={(e) => { setOrganizationNameValue(e.target.value) }}
                        className="peer/organization-name w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                    />
                    <label
                        htmlFor="organization-name-field"
                        className={`absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm duration-200 transition-all transform origin-left peer-focus/organization-name:-top-1.5 peer-focus/organization-name:left-2.5 peer-focus/organization-name:text-xs peer-focus/organization-name:text-slate-400 peer-focus/organization-name:scale-90 ${(organizationNameValue === '') ? '' : "-top-1.5 left-2.5 text-xs text-slate-400 scale-90"}`}
                    >
                        Organization Name<span className="text-red-400">*</span>
                    </label>
                </div>
            </div>
            <div className="w-full py-2">
                <div className="relative">
                    <textarea
                        id="event-description-field"
                        onChange={(e) => { setEventDescriptionValue(e.target.value) }}
                        className="peer/event-description resize-none w-full h-24 bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-200 ease shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                    />
                    <label
                        htmlFor="event-description-field"
                        className={`absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm duration-200 transition-all transform origin-left peer-focus/event-description:-top-1.5 peer-focus/event-description:left-2.5 peer-focus/event-description:text-xs peer-focus/event-description:text-slate-400 peer-focus/event-description:scale-90 ${(eventDescriptionValue === '') ? '' : "-top-1.5 left-2.5 text-xs text-slate-400 scale-90"}`}
                    >
                        Event Description
                    </label>
                </div>
            </div>
    </div>
  )
}
