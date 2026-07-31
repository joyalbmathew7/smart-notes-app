import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/dashboard.css";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchNotes();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("users/me/");
      setUser(response.data);
    } catch (error) {
      console.error("Unable to load profile:", error);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/");
    }
  };

  const fetchNotes = async () => {
    setLoadingNotes(true);
    try {
      const response = await api.get("notes/");
      setNotes(response.data);
    } catch (error) {
      console.error("Failed to load notes:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
      }
    } finally {
      setLoadingNotes(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setEditingNote(null);
  };

  const addNote = async () => {
    try {
      const response = await api.post("notes/", {
        title,
        content,
        category,
      });
      setNotes((prev) => [response.data, ...prev]);
      resetForm();
    } catch (error) {
      console.error("Failed to add note:", error);
      alert("Could not create note. Please try again.");
    }
  };

  const updateNote = async () => {
    if (!editingNote) return;

    try {
      const response = await api.put(`notes/${editingNote.id}/`, {
        title,
        content,
        category,
      });
      setNotes((prev) => prev.map((note) => (note.id === editingNote.id ? response.data : note)));
      resetForm();
    } catch (error) {
      console.error("Failed to update note:", error);
      alert("Could not update note. Please try again.");
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`notes/${id}/`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Could not delete note. Please try again.");
    }
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category || "");
    setEditingNote(note);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <Sidebar />

        <main className="main-content">
          <section className="dashboard-header card">
            <div>
              <h1>Welcome back, {user?.first_name || user?.username || "Guest"}!</h1>
              <p className="dashboard-subtitle">Your notes are saved securely in your account.</p>
            </div>
            <div className="dashboard-stats">
              <div className="stat-card">
                <span>{notes.length}</span>
                <p>Total notes</p>
              </div>
              <div className="stat-card">
                <span>{editingNote ? "Editing" : "New"}</span>
                <p>{editingNote ? "Edit note mode" : "Create a note"}</p>
              </div>
            </div>
          </section>

          <section className="editor-section">
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

            <NoteList notes={notes} deleteNote={deleteNote} editNote={editNote} loading={loadingNotes} />
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
