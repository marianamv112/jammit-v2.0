const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    bio: {
      type: String,
      default: "",
    },
    instruments: {
      type: [String],
      default: [""]
    },
    profilePicture: {
      type: String,
      default: "https://s3.eu-west-3.amazonaws.com/v2.0-jammit/2106324.jpg",
    },
    status: {
      type: String, 
      enum: ['Pending', 'Active'], 
      default: 'Pending',
    },
    confirmationCode: {
      type: String, 
      unique: true
    },
    socialMedia: {
      instagram: { type: String, default: ""},
      spotify: { type: String, default: ""},
      youtube: { type: String, default: ""},
      facebook: { type: String, default: ""},
    },
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User