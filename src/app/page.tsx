'use client';

import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import RecommendedEvents from "@/components/events/RecommendedEvents";
import AllEvents from "@/components/events/AllEvents";

interface Event {
  _id: string;
  eventName: string;
  organizationName: string;
  eventDescription: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  venueAddress: string;
  eventImageString: string;
}

export default function EventsPage() {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setMounted(true);
    setCurrentDate(new Date());

    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background"></div>;
  }

  return (
    <MainLayout>
      <RecommendedEvents currentDate={currentDate} eventsCount={events.length} />
      <AllEvents events={events} />
    </MainLayout>
  );
}
