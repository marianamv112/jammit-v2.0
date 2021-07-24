const express = require("express");
const Event = require("../models/event");
const eventRoutes = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { isLoggedIn } = require("../middleware");
const User = require("../models/user");
const { default: axios } = require("axios");

const uploadFile = (buffer, name, type) => {
  s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.AWS_BUCKET_NAME,
    ContentType: type,
    Key: name,
  };
  return s3bucket.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    }
  });
};

eventRoutes.post(
  "/new-event",
  isLoggedIn,
  upload.single("file"),
  (req, res, next) => {
    const { title, description, location, place, instruments, date } = req.body;
    const author = req.user.id;
    let eventPicture;

    console.log("I tried")

    if (req.file) {
      let imageFile = req.file;
      uploadFile(imageFile.buffer, imageFile.originalname, imageFile.mimetype);
      eventPicture = process.env.AWS_UPLOADED_FILE_URL + imageFile.originalname;
    }


    Event.create({
      author,
      title,
      description,
      location,
      place,
      date,
      instruments,
      eventPicture,
    }).then((newEvent) => {
      User.findOne({ _id: author }, (err, foundUser) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Something went wrong" });
          return;
        }
        if (foundUser) {
          User.findByIdAndUpdate(
            foundUser.id,
            { events: [...foundUser.events, newEvent._id] },
            { new: true }
          )
            .then(res.status(200).json({ newEvent: newEvent }))
            .catch((error) =>
              res.status(500).json({ message: "Could not update user" })
            );
        } else {
          res.status(404).json({ message: "User not found" });
        }
      });
    });
  }
);

eventRoutes.get("/user-events/:userId", isLoggedIn, (req, res, next) => {
  const userId = req.params.userId;
  Event.find({ author: userId }).populate('author')
    .then((userEvents) => res.status(200).json({ events: userEvents }))
    .catch((err) => res.status(500).json("Something bad happened"));
});

eventRoutes.get("/all", isLoggedIn, (req, res, next) => {
  Event.find().populate('author')
    .then((events) => res.status(200).json({ events: events }))
    .catch((err) => res.status(500).json("Something bad happened"));
});

eventRoutes.get("/single-event/:eventId", isLoggedIn, (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findById(eventId).populate('author')
    .then((eventFound) => res.status(200).json({ event: eventFound }))
    .catch((err) => res.status(500).json("Something bad happened"));
});

eventRoutes.post(
  "/edit-event/:eventId",
  isLoggedIn,
  upload.single("file"),
  (req, res, next) => {
    let fieldsToUpdate = { title, description, location, instruments, place, date } = req.body;
    const eventId = req.params.eventId
    let eventPicture;

    if (req.file) {
      let imageFile = req.file;
      uploadFile(imageFile.buffer, imageFile.originalname, imageFile.mimetype);
      eventPicture = process.env.AWS_UPLOADED_FILE_URL + imageFile.originalname;
      fieldsToUpdate = { ...fieldsToUpdate, eventPicture }
    }


    Event.findById(eventId)
      .then(event => {
        if (event.author._id.toString() == req.user._id.toString()) {
          Event.findByIdAndUpdate(eventId, fieldsToUpdate)
            .then((updatedEvent) => res.status(200).json({ event: updatedEvent }))
            .catch((err) => res.status(500).json("Something bad happened"));
        } else {
          return res.status(403).json("Unauthorized action")
        }
      })
  }
);

eventRoutes.get('/search/:query', isLoggedIn, (req, res, next) => {
  const query = req.params.query
  Event.find({ $text: { $search: query } })
    .then((searchResults) => res.status(200).json({ results: searchResults }))
    .catch((err) => res.status(500).json("Something bad happened"))
})

eventRoutes.delete('/:eventId', isLoggedIn, (req, res, next) => {
  const eventId = req.params.eventId
  Event.deleteOne({ _id: eventId }).then()
})

module.exports = eventRoutes;
