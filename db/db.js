const mongoose = require("mongoose");
function initialzeDBConnection() {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("connected to database"))
    .catch((error) => console.log("Connection failed...", error));
}

module.exports = { initialzeDBConnection };
