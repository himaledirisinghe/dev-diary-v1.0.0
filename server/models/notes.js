const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  questionCode: String,
  answer:{
    type: String,
    required: true,
  },
  answerCode: String,
  noteCategory: {
    type: String,
    required: true,
  },
  dateCreated: Date,
  dateModified: Date,
});

noteSchema.pre("save", function (next) {
  var now = new Date();
  this.dateCreated = now;
  next();
});

noteSchema.pre("findOneAndUpdate", function (next) {
  this.set({ dateModified: new Date() });
  next();
});

module.exports = mongoose.model("Notes", noteSchema);
