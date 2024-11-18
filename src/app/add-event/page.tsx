import React from "react";
import SiteHeader from "@/components/navbar/siteHeader";
import EventForm from "./eventForm";

export default function addEventsPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <SiteHeader />
      <EventForm />
    </div>
  );
}
