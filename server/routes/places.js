const express = require("express");
const mapRoutes = express.Router();
const axios = require("axios");
const { isLoggedIn } = require("../middleware");

mapRoutes.get("/:query", isLoggedIn, (req, res, next) => {
  const query = req.params.query;
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+jam+session&radius=10000&key=${process.env.GOOGLE_MAPS_API_KEY}`
    )
    .then((response) => {
      console.log("check" + response)
      res.json({ jamSessions: response.data })
    })
    .catch((error) => {
      console.log("error is " + error)
      res.status(500).json("Something bad happened");
    }); 
});

module.exports = mapRoutes;
