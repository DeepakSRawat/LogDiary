import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, addnote } = context;
  return (
    <div className="row">
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note}></NoteItem>;
      })}
    </div>
  );
};

export default Notes;
