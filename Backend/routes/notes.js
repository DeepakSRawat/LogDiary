const express = require("express");
const fetchUser = require("../middleWare/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Route: Get All the notes: GET "/api/notes/fetchAllNotes". Login required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error occured");
  }
});
// Route: Add a new note using: POST "/api/notes/addNote". Login required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    // if there is an error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error occured");
    }
  }
);

// ROUTES: update existing note: PUT "/api/notes/updateNote/:id". Login required
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  // now create a new note
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // find the note by its id and update it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json(note);
});

module.exports = router;
