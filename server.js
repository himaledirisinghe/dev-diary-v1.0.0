const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//import routes
const postRoutes = require('./routes/posts');

//app middleware
app.use(bodyParser.json());

//route middleware
app.use(postRoutes);

const PORT = 8000;
const DB_URL =
  "mongodb+srv://himal:himal123@mernapp.2byzbhi.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log("DB Connection Error", err));

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});