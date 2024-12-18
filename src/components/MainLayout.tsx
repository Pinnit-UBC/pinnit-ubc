'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MenuIcon, Search, Plus } from "lucide-react";
import DashboardSidebar from "./dashboard-sidebar"; // Main Sidebar
import Sidebar from "@/components/events/Sidebar"; // Info Sidebar
import RecommendedEvents from "@/components/events/RecommendedEvents";
import AllEvents from "@/components/events/AllEvents";
import { useState, useEffect } from "react";

interface Event {
  _id: string;
  eventName: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventImageString: string;
}

export default function MainLayout() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  const recommendedEvents = events.slice(0, 4);
  const allOtherEvents = events.slice(4);

  return (
    <div className="flex h-screen">
      {/* Fixed Left Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-grow bg-background overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
          <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg"
                  alt="Pinnit Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-bold text-xl">PINNIT</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <form className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search events..."
                  className="pl-8 w-[200px] lg:w-[300px] border rounded-md"
                />
              </form>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-6 grid gap-6 grid-cols-[1fr,300px]">
          <div className="overflow-hidden">
            <RecommendedEvents events={recommendedEvents} />
            <AllEvents events={allOtherEvents} />
          </div>

          {/* Right Info Sidebar */}
          <Sidebar />
        </main>

        {/* Footer */}
        <footer className="border-t mt-12">
          <div className="container py-6 text-center text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Subscribe to our newsletter
            </Link>
            {" • "}
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
            {" • "}
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
