const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PinnitEvent = require("../../models/pinnitEvent");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8080;

const username = "admin";
const password = "pinnitadmin123"
const db = "pinnitDb";
const cluster = "cluster0"

const URI = `mongodb+srv://${username}:${password}@${cluster}.dvqbjnc.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(URI)
    .then(() => { console.log("Connected to pinnitDb") })
    .catch(() => { console.log("Can't connect to pinnitdB") })

app.post("/addPinnitEvent", async (req, res) => {
    try {
        const JSONPinnitEvent = req.body
        const pinnitEventToAdd = new PinnitEvent(JSONPinnitEvent)
        await pinnitEventToAdd.save();

        res.status(201).send({ message: "Event added successfully", event: newEvent });
    } catch (err) {
        res.status(500).send({ message: "Error adding event", err });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
