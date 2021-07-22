const express = require("express");
const mapRoutes = express.Router();
const axios = require("axios");
const { isLoggedIn } = require("../middleware");

mapRoutes.get("/places/:query", isLoggedIn, (req, res, next) => {
  const query = req.params.query;
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+jam+session&radius=10000&key=${process.env.GOOGLE_PLACES_API_KEY}`
    )
    .then((response) => {
      res.json({ jamSessions: response.data })
    })
    .catch((error) => {
      res.status(500).json("Something bad happened");
    }); 
});

mapRoutes.get("/image/:imageRef", isLoggedIn, (req, res, next) => {
  const imageRef = req.params.imageRef;
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imageRef}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    )
    .then((response) => {
      res.json({ imageUrl: response.data })
    })
    .catch((error) => {
      res.status(500).json("Something bad happened");
    }); 
});

module.exports = mapRoutes;
