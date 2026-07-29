import NoteCard from "./NoteCard";

function NoteList({ notes, deleteNote,  editNote }) {
  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          editNote={editNote}
        />
      ))}
    </div>
  );
}

export default NoteList;