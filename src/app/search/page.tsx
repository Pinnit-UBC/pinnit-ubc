"use client"
import React, { useEffect, useState } from 'react'
import HomeHeader from "@/components/search-bar/homeHeader";
import SearchBar from "@/components/search-bar/searchBar";

export type EventContext = {
    _id: string;
    eventDate: string;
    eventDescription: string;
    eventEndTime: string;
    eventImageString: string;
    eventName: string;
    eventStartTime: string;
    onlineEventLink: string;
    organizationName: string;
    venueAddress: string;
    venueLat: number;
    venueLng: number;
    venueLocationDescription: string;
    venueLocationName: string;
    __v: number;
  };

export default function SearchPage() {
    const [events, setEvents] = useState<EventContext[]>([])
    const [textSearched, setTextSearched] = useState<string>("")

    useEffect(() => {
        const searchQueryRes = localStorage.getItem("searchedResults")
        let numOfEvents = 0;
        if (searchQueryRes) {
            const searchedEvents = JSON.parse(searchQueryRes).searchedEvents
            numOfEvents = searchedEvents.length
            setEvents(searchedEvents);
        }
        const currURL = window.location.href
        const sliceIndex = currURL.indexOf("?")

        setTextSearched(currURL.substring(sliceIndex + 1))
        
        if(sliceIndex == -1){
            setTextSearched(`No events found`)
        } else {
            setTextSearched(`Showing ${numOfEvents} ${(numOfEvents == 1) ? "Result" : "Results"} for ${currURL.substring(sliceIndex + 1)}`)
        }
        

      }, []);


    
    return (
        <div>
            <HomeHeader />
            <SearchBar />
            <h1 className='font-bold'>{textSearched}</h1>
            {events.map((item) => {
                return <div key={item._id}> {item.eventName} </div>
            })}

            
        </div>
    )
}
