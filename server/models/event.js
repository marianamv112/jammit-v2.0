const mongoose = require("mongoose");
const Schema = mongoose.Schema

const eventSchema = new Schema({
    author: {
        type: String, 
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    eventPicture: {
        type: String,
        default: "https://s3.eu-west-3.amazonaws.com/v2.0-jammit/music-bar.jpeg"
    },
    description: {
        type: String,
    },
    place: {
        type: String,
    },
    location: {
        type: String,
    },
    instruments: {
        type: [String],
        default: [""]
    },
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event;