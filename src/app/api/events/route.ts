import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    console.log("Connected to MongoDB");

    // Correct database and collection names
    const db = client.db("pinnitDb");
    const events = await db.collection("events").find({}).toArray();

    console.log("Fetched events:", events); // Debug: Log fetched events
    return NextResponse.json(events); // Return the events as a JSON array
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json([], { status: 500 }); // Return an empty array on error
  }
}
