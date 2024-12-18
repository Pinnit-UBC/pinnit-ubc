'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Flame } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="space-y-6 w-[300px]">
      {/* Search by Date Card */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Search by date</h3>
        </CardHeader>
        <CardContent>
          <p>Calendar placeholder (add your calendar picker here).</p>
        </CardContent>
      </Card>

      {/* Featured Event Card */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Featured Event</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-orange-600">
            <Flame className="h-5 w-5" />
            <div className="font-semibold">(19+) The Pit of Nightmares</div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Don't miss out on the scariest event of the night!
          </p>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Event Map</h3>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Map placeholder</p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
