import { NextResponse } from "next/server";
import EventModel from "../../../lib/models/Event";
import connectDB from "../../../lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const JSONPinnitEvent = await req.json();
    const pinnitEventToAdd = new EventModel(JSONPinnitEvent);
    console.log(pinnitEventToAdd);

    pinnitEventToAdd.eventDate = new Date(pinnitEventToAdd.eventDate);
    pinnitEventToAdd.venueLat = Number(pinnitEventToAdd.venueLat);
    pinnitEventToAdd.venueLng = Number(pinnitEventToAdd.venueLng);
    await pinnitEventToAdd.save();

    return NextResponse.json({
      message:
        "Event added successfully. Return to the Home Page to see your event!",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: err,
    });
  }
}
