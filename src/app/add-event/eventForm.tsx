"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import EventDetailsGeneral from './eventDetailsGeneral';
import EventDetailsTime from './eventDetailsTime';
import EventDetailsLocation from './eventDetailsLocation';
import ImageUploadButton from './imageUploadButton';
import AddEventsHeader from './addEventsHeader';

export default function EventForm() {
    const addEventsFormData = new FormData()
    //peer/--- : attaches something that is related to the identified element
    //transition duration-300 ease-linear: tansition taking 300ms is taken in linear time for a state change of that element (eg. hover, focus, etc)
    //transform: movement/translation of the input
    //*TODO*: Discuss the -top-1.5 we want 2

    useEffect(() => {
        addEventsFormData.append("eventName", "")
        addEventsFormData.append("organizationName", "")
        addEventsFormData.append("eventDescription", "")
        addEventsFormData.append("onlineEventLink", "")
        addEventsFormData.append("eventImageString", "")
        addEventsFormData.append("venueLocationName", "")
        addEventsFormData.append("venueLocationDescription", "")
    }, [])

    const handleAddEventFormSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const addEventJSON: Record<string, string | number> = {}
        for (const pair of addEventsFormData.entries()) {
            addEventJSON[pair[0] as string] = pair[1] as string | number;
        }

        try {
            const response = await fetch("http://localhost:3000/api/events", {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(addEventJSON)
            })

            const resJSON = await response.json()
            alert(resJSON.message);
            (document.getElementById("add-event-form") as HTMLFormElement).reset()
            window.location.href = "./"
        } catch (err) {
            alert(err)
            console.log(err)
        }

    }

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <AddEventsHeader />
            <form id="add-event-form" className='w-[600px]'>
                <div className='w-full flex flex-col pb-12 pt-4'>
                    <h1 className='text-5xl font-bold font-inter py-0.5'>Create a Pinnit Event</h1>
                    <p className='text-xs font-inter pt-0 py-0.5'>Give us some information about your event and we will pin an event for you</p>
                </div>
                <EventDetailsGeneral addEventsFormData={addEventsFormData} />
                <EventDetailsTime addEventsFormData={addEventsFormData} />
                <EventDetailsLocation addEventsFormData={addEventsFormData} />
                <ImageUploadButton addEventsFormData={addEventsFormData} />
            </form>
            <footer className='sticky flex justify-end gap-6 bottom-0 left-0 w-full border-t bg-white text-black p-5 shadow-md'>
                <Link href='/'>
                    <button className='rounded-md text-[#556cd6] font-inter px-4 py-2 transition duration-200 ease hover:bg-slate-100'>
                        Home
                    </button>
                </Link>
                <button
                    className="bg-[#556cd6] rounded-md font-inter text-primary-foreground px-4 py-2 transition duration-200 ease hover:bg-[#3f4b8c]"
                    form="add-event-form"
                    onClick={(e) => handleAddEventFormSubmit(e)}>
                        Create Event
                </button>
            </footer>
        </div>
    )
}
