import React from "react";
import EventForm from "./eventForm";

export default function addEventsPage() {
  return (
    <div className="flex flex-col w-full bg-[url('/Images/addEventsBackground.png')] bg-cover bg-center">
      <EventForm />
    </div>
  );
}
