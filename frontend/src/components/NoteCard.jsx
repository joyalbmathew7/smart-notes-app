function NoteCard({ note, deleteNote, editNote }) {
  return (
    <div className="note-card card">
      <div className="note-header">
        <h3>{note.title}</h3>
        <span className="note-category">{note.category || "General"}</span>
      </div>

      <p className="note-content">{note.content}</p>
      <div className="note-actions">
        <button className="btn secondary-btn" onClick={() => editNote(note)}>
          Edit
        </button>
        <button className="btn danger-btn" onClick={() => deleteNote(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
