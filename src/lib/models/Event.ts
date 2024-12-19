import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  eventName: String,
  organizationName: String,
  eventDescription: String,
  eventDate: Date,
  eventStartTime: String,
  eventEndTime: String,
  onlineEventLink: String,
  venueLocationName: String,
  venueLocationDescription: String,
  venueAddress: String,
  venueLat: Number,
  venueLng: Number,
  eventImageString: String,
});

const Event = models.events || model("events", EventSchema);

export default Event;
