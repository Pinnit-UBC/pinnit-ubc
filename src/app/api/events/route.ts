import { NextResponse, NextRequest } from "next/server";
import PinnitEvent from "../../models/pinnitEvent";
import pinnitDBConnection from '../../utils/db';

await pinnitDBConnection()

export async function POST(req: Request) {
  try {
    const JSONPinnitEvent = await req.json()
    console.log(JSONPinnitEvent)
    const pinnitEventToAdd = new PinnitEvent(JSONPinnitEvent)
    

    pinnitEventToAdd.venueLat = parseInt(pinnitEventToAdd.venueLat, 10)
    pinnitEventToAdd.venueLng = parseInt(pinnitEventToAdd.venueLng, 10)

    console.log(pinnitEventToAdd)

    await pinnitEventToAdd.save();

    return NextResponse.json(
      {
        message: "Event added successfully. Return to the Home Page to see your event!",
        status: 200
      }
    )
  } catch (err) {
    return NextResponse.json(
      {
        message: err
      }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const filterBy = req.nextUrl.searchParams.get("filterBy") as string;
    const date = req.nextUrl.searchParams.get("date") as string;
    const textSearch = req.nextUrl.searchParams.get("textSearch") as string;

    console.log(filterBy, date, textSearch)

    let searchQueryDate: Date;
    if (date != "") {
      searchQueryDate = new Date(date.substring(0, 10))
    } else {
      const currentDate = new Date()
      const timezoneOffset = -8
      searchQueryDate = new Date(currentDate.getTime() + (timezoneOffset * 60 * 60 * 1000))
    }

    const seachedPinnitEvents = await PinnitEvent.find(
      {
        [filterBy]: { $regex: textSearch, $options: 'i' },
        eventDate: { $gte: searchQueryDate }
      }
    )

    console.log(seachedPinnitEvents)
    return NextResponse.json(
      {
        searchedEvents: seachedPinnitEvents
      }
    )
  } catch (err) {
    return NextResponse.json(
      {
        message: err
      }
    )

  }

}