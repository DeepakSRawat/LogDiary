import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "65a652f0942377932b9323c4",
      user: "65a3848a979b7842d0d6c7c1",
      title: "first Note",
      description: "hello, this is my first note",
      tag: "General",
      date: "2024-01-16T09:57:04.673Z",
      __v: 0,
    },
    {
      _id: "65a652f0942377932b9323c4",
      user: "65a3848a979b7842d0d6c7c1",
      title: "second Note",
      description: "cool, this is my second note",
      tag: "General",
      date: "2024-01-16T09:57:04.673Z",
      __v: 0,
    },
    {
      _id: "65a652f0942377932b9323c4",
      user: "65a3848a979b7842d0d6c7c1",
      title: "third Note",
      description: "wow, this is my third note",
      tag: "General",
      date: "2024-01-16T09:57:04.673Z",
      __v: 0,
    },
    {
      _id: "65a652f0942377932b9323c4",
      user: "65a3848a979b7842d0d6c7c1",
      title: "fourth Note",
      description: "superb, this is my fourth note",
      tag: "General",
      date: "2024-01-16T09:57:04.673Z",
      __v: 0,
    },
    {
      _id: "65a652f0942377932b9323c4",
      user: "65a3848a979b7842d0d6c7c1",
      title: "fifth Note",
      description: "finally, this is my fifth note",
      tag: "General",
      date: "2024-01-16T09:57:04.673Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
