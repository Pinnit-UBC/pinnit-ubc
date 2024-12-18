'use client';

import Carousel from "./Carousel";

interface Event {
  _id: string;
  eventName: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventImageString: string;
}

export default function AllEvents({ events }: { events: Event[] }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">All Events</h2>
      <Carousel events={events} />
    </section>
  );
}
