function NoteCard({ note, deleteNote, editNote }) {
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <small>{note.category}</small>

      <br />
      <br />
      <button onClick={() => editNote(note)}>
        Edit
      </button>
      <button onClick={() => deleteNote(note.id)}>
        Delete
      </button>

      <hr />
    </div>
  );
}

export default NoteCard;