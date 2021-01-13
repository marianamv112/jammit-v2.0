var mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/jammit-v2-tests", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    mongoose.connection.db.dropDatabase().then((x) => {
      mongoose.connection.close();
      console.log(`Dropped database`);
    });
  })
  .catch((err) => console.error("Error connecting to mongo", err));

