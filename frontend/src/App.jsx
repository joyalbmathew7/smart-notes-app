import { useEffect, useState } from "react";
import api from "./services/api";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    api
      .get("notes/")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => console.error(error));
  };

  const addNote = () => {
    api
      .post("notes/", {
        title,
        content,
        category,
        is_pinned: false,
      })
      .then(() => {
        fetchNotes();

        setTitle("");
        setContent("");
        setCategory("");
      })
      .catch((error) => console.error(error));
  };
  const deleteNote = (id) => {
  api
    .delete(`notes/${id}/`)
    .then(() => {
      fetchNotes();
    })
    .catch((error) => console.error(error));
};
  const editNote = (note) => {
  setEditingNote(note);

  setTitle(note.title);
  setContent(note.content);
  setCategory(note.category);
};
const updateNote = () => {
  api
    .put(`notes/${editingNote.id}/`, {
      title,
      content,
      category,
      is_pinned: editingNote.is_pinned,
    })
    .then(() => {
      fetchNotes();

      setTitle("");
      setContent("");
      setCategory("");

      setEditingNote(null);
    })
    .catch((error) => console.error(error));
};
  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Notes App</h1>
      <NoteForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        category={category}
        setCategory={setCategory}
        addNote={addNote}
        editingNote={editingNote}
        updateNote={updateNote}
      />
      
      <NoteList 
      notes={notes}
      deleteNote={deleteNote}
      editNote={editNote}
      />


    </div>
  );
}

export default App;