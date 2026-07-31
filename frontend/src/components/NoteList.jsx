import NoteCard from "./NoteCard";

function NoteList({ notes, deleteNote, editNote, loading }) {
  if (loading) {
    return <div className="note-list empty-state">Loading notes...</div>;
  }

  if (!notes.length) {
    return <div className="note-list empty-state">You don't have any notes yet. Add your first note!</div>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} />
      ))}
    </div>
  );
}

export default NoteList;
