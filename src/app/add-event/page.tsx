import React from "react";
import SiteHeader from "@/components/navbar/siteHeader";
import EventForm from "./eventForm";

export default function addEventsPage() {
  return (
    <div className="flex flex-col w-full bg-[url('/Images/addEventsBackground.png')] bg-cover bg-center">
      <SiteHeader />
      <EventForm />
    </div>
  );
}
