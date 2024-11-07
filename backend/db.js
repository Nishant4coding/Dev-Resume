const mongoose = require("mongoose");
require("dotenv").config();
// const mongoURI=process.env.REACT_APP_INVOICE_DATA;
const connectToMongo = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected To Mongo - Success...");
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectToMongo;
