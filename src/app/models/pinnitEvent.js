import mongoose from 'mongoose';

const PinnitEventSchema = new mongoose.Schema({
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
})

const PinnitEvent = mongoose.models.events || mongoose.model("events", PinnitEventSchema) 


export default PinnitEvent;