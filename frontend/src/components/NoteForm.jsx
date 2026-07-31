function NoteForm({
  title,
  setTitle,
  content,
  setContent,
  category,
  setCategory,
  addNote,
  editingNote,
  updateNote,
}) {
  return (
    <div className="note-form card">
      <h2>{editingNote ? "Edit note" : "Create new note"}</h2>

      <label className="form-label">
        Title
        <input
          className="input-field"
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="form-label">
        Content
        <textarea
          className="input-field textarea-field"
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>

      <label className="form-label">
        Category
        <input
          className="input-field"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>

      <button
        className="btn primary-btn"
        type="button"
        onClick={editingNote ? updateNote : addNote}
      >
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
}

export default NoteForm;
