import { NextResponse } from "next/server";
import Event from "@/lib/models/Event";
import connectDB from "@/lib/db";

export async function DELETE(req: Request, context: { params: any }) {
  try {
    await connectDB();
    const event_id = await context.params.event_id;

    const event = await Event.findById(event_id);
    if (!event) {
      return NextResponse.json(
        {
          message: "Event does not exist",
        },
        { status: 404 }
      );
    }

    await Event.findByIdAndDelete(event_id);

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
