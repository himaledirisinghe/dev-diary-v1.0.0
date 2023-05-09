const express = require("express");
const Notes = require("../models/notes");

const router = express.Router();

//save note
router.post("/note/save", (req, res) => {
  let newNote = new Notes(req.body);
  newNote
    .save()
    .then(() => {
      return res.status(200).json({
        success: "Note Saved Successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});

//get notes
router.get("/notes", (req, res) => {
  Notes.find()
    .then((notes) => {
      return res.status(200).json({
        success: true,
        existingNotes: notes,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});

//get a specific note
router.get("/notes/:id", (req, res) => {
  let noteId = req.params.id;
  Notes.findById(noteId)
    .then((note) => {
      return res.status(200).json({
        success: true,
        note,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        err,
      });
    });
});

//update note
router.put("/note/update/:id", (req, res) => {
  Notes.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((note) => {
      return res.status(200).json({
        success: "Updated Successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});

//delete note
router.delete("/note/delete/:id", (req, res) => {
  Notes.findByIdAndRemove(req.params.id)
    .then((deletedNote) => {
      return res.json({
        message: "Delete Successfull",
        deletedNote,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    });
});

module.exports = router;
