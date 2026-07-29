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
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br /><br />

      <button
  onClick={
    editingNote
      ? updateNote
      : addNote
  }
>
  {editingNote ? "Update Note" : "Add Note"}
</button>

      <hr />
    </div>
  );
}

export default NoteForm;