import { NextResponse } from "next/server";
const mongoose = require("mongoose");
const PinnitEvent = require('../../models/pinnitEvent');

const username = "admin";
const password = "pinnitadmin123"
const db = "pinnitDb";
const cluster = "cluster0"

const URI = `mongodb+srv://${username}:${password}@${cluster}.dvqbjnc.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(URI)
    .then(() => { console.log("Connected to pinnitDb") })
    .catch(() => { console.log("Can't connect to pinnitdB") })

export async function POST(req: Request) {
  try {
    const JSONPinnitEvent = await req.json()
    console.log(JSONPinnitEvent)

    const pinnitEventToAdd = new PinnitEvent(JSONPinnitEvent)
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
      message: "Error adding event"
    }
  )
  }

}