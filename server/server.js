const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//import routes
const noteRoutes = require("./routes/notes");

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(noteRoutes);

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
