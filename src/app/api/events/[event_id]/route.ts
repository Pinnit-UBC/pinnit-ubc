import { NextResponse } from "next/server";
import EventModel from "@/lib/models/Event";
import connectDB from "@/lib/db";
import { EventRequest } from "@/types/event";

export async function DELETE(req: Request, context: { params: any }) {
  try {
    await connectDB();
    const { event_id } = await context.params;

    const event = await EventModel.findById(event_id);
    if (!event) {
      return NextResponse.json(
        {
          message: "Event does not exist",
        },
        { status: 404 }
      );
    }

    await EventModel.findByIdAndDelete(event_id);

    return NextResponse.json(
      {
        message: "Event has been deleted",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({
      message: err,
    });
  }
}

export async function PATCH(req: Request, context: { params: any }) {
  try {
    await connectDB();

    const body: EventRequest = await req.json();
    const { event_id } = await context.params;

    // Check if event exists
    const event = await EventModel.findById(event_id);
    if (!event) {
      return NextResponse.json(
        {
          message: "Event does not exist",
        },
        { status: 404 }
      );
    }

    console.log(body);

    // If so, apply changes to event detail
    await EventModel.findOneAndUpdate({ _id: event_id }, body);

    return NextResponse.json(
      {
        message: "Event has been successfully edited",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({
      message: err,
    });
  }
}
