const express = require("express");
const userRoutes = express.Router();

const User = require("../models/user");

const multer = require("multer");
const AWS = require("aws-sdk");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRoutes.get("/:username", (req, res, next) => {
  User.findOne({ username: req.params.username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (foundUser) {
      res.status(200).json(foundUser);
      return;
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

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

userRoutes.post("/:username/edit", upload.single("file"), (req, res, next) => {
  const { username, bio, instruments, instagram, facebook, spotify, youtube } = req.body;
  const socialMedia = { instagram, facebook, spotify, youtube }

  let profilePicture;

  if (req.file) {
    let imageFile = req.file;
    uploadFile(imageFile.buffer, imageFile.originalname, imageFile.mimetype);
    profilePicture = process.env.AWS_UPLOADED_FILE_URL + imageFile.originalname
  } else {
    profilePicture = req.user.profilePicture;
  }

  User.findOne({ username: req.user.username }, (err, foundUser) => {
    
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (foundUser) {
      User.findByIdAndUpdate(
        foundUser.id,
        { username, bio, instruments, profilePicture, socialMedia },
        { new: true }
      )
        .then((updatedUser) => res.status(200).json(updatedUser))
        .catch((error) =>
          res.status(500).json({ message: "Could not update user" })
        );
      return;
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

module.exports = userRoutes;
