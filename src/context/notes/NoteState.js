import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "65a652f09423779322b9323c4",
      user: "65a3848a979b7842d0d6c7c1",
      title: "first Note",
      description: "hello, this is my first note",
      tag: "General",
      date: "2024-01-16T09:57:04.673Z",
      __v: 0,
    },
    {
      _id: "65a652f09242377932b9323c4",
      user: "65a3848a979b7842d0d6c7c1",
      title: "second Note",
      description: "cool, this is my second note",
      tag: "General",
      date: "2024-01-16T09:57:04.673Z",
      __v: 0,
    },
    {
      _id: "65a652f09423773932b9323c4",
      user: "65a3848a979b7842d0d6c7c1",
      title: "third Note",
      description: "wow, this is my third note",
      tag: "General",
      date: "2024-01-16T09:57:04.673Z",
      __v: 0,
    },
    {
      _id: "65a4652f0942377932b9323c4",
      user: "65a3848a979b7842d0d6c7c1",
      title: "fourth Note",
      description: "superb, this is my fourth note",
      tag: "General",
      date: "2024-01-16T09:57:04.673Z",
      __v: 0,
    },
    {
      _id: "65a652f09423747932b9323c4",
      user: "65a3848a979b7842d0d6c7c1",
      title: "fifth Note",
      description: "finally, this is my fifth note",
      tag: "General",
      date: "2024-01-16T09:57:04.673Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Add(create) a note
  const addNote = (title, description, tag) => {
    note = {
      _id: "65a652f029423747932b9323c4",
      user: "65a3848a979b7842d0d6c7c1",
      title: "sixth Note",
      description: "that's all, this is my sixth note",
      tag: "General",
      date: "2024-01-16T09:57:04.673Z",
      __v: 0,
    };
    setNotes(notes.push(note));
  };
  // Edit(update) a note
  const editNote = () => {};
  // delete a note
  const deleteNote = () => {};
  return (
    <noteContext.Provider value={{ addNote, notes, editNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
