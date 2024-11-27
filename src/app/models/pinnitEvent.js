const mongoose = require("mongoose");

const PinnitEventSchema = new mongoose.Schema({
    eventName: String,
    organizationName: String,
    eventDescription: String,
    eventDate: String,
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


module.exports = PinnitEvent;