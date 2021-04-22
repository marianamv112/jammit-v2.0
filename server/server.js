const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events')
const cors = require('cors');
require('./config/passport');


const app = express();


app.use(express.static(path.join(__dirname, "../client/public")));

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    // ttl => time to live
    ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);

//https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&location=42.3675294,-71.186966&radius=10000&key=YOUR_API_KEY


// For any routes that starts with "/api", catch 404 and forward to error handler
app.use("/api/*", (req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
})

// For any other routes, redirect to the index.html file of React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
