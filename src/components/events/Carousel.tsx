'use client';

import { useRef } from "react";
import EventCard from "./EventCard";

interface Event {
  _id: string;
  eventName: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventImageString: string;
}

export default function Carousel({ events }: { events: Event[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md z-10"
      >
        {"<"}
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md z-10"
      >
        {">"}
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4"
        style={{
          scrollBehavior: "smooth",
          width: "100%", // Ensures the carousel stays within its container
        }}
      >
        {events.map((event) => (
          <div className="min-w-[250px] max-w-[250px] flex-shrink-0" key={event._id}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
