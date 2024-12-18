'use client';

import Image from "next/image";

interface Event {
  _id: string;
  eventName: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventImageString: string;
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="relative w-[250px] h-[300px] rounded-lg overflow-hidden shadow-lg">
      {/* Background Image */}
      <Image
        src={event.eventImageString || "/placeholder.svg"}
        alt={event.eventName}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />

      {/* White Box with Event Details */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
        <h3 className="text-lg font-bold">{event.eventName}</h3>
        <p className="text-sm text-gray-600">{new Date(event.eventDate).toDateString()}</p>
        <p className="text-sm text-gray-600">{`${event.eventStartTime} - ${event.eventEndTime}`}</p>
      </div>
    </div>
  );
}
