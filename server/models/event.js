const mongoose = require("mongoose");
const Schema = mongoose.Schema

const eventSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
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
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    instruments: {
        type: [String],
        default: [""]
    },
})

eventSchema.index({"'$**'": "text"})
const Event = mongoose.model('Event', eventSchema)

module.exports = Event;