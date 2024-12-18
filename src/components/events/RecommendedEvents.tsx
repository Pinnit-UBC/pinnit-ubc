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

export default function RecommendedEvents({ events }: { events: Event[] }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Recommended Events</h2>
      <Carousel events={events} />
    </section>
  );
}
