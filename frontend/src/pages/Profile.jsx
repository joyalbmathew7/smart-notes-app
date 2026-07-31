import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

function Profile() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("users/me/");
      setFormData(response.data);
    } catch (error) {
      console.error("Unable to load profile:", error);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = { ...formData };
    if (password.trim()) {
      payload.password = password;
    }

    try {
      await api.put("users/me/", payload);
      alert("Profile updated successfully.");
      setPassword("");
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Unable to update profile. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return;
    }

    try {
      await api.delete("users/me/");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Could not delete account. Please try again.");
    }
  };

  if (loading) {
    return <div className="auth-page">Loading profile...</div>;
  }

  return (
    <div className="auth-page">
      <div className="auth-card profile-card">
        <h1 className="auth-title">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-label">
            Username
            <input
              className="input-field"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            Email
            <input
              type="email"
              className="input-field"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            First Name
            <input
              className="input-field"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </label>

          <label className="form-label">
            Last Name
            <input
              className="input-field"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </label>

          <label className="form-label">
            New Password
            <input
              type="password"
              className="input-field"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
            />
          </label>

          <div className="auth-actions">
            <button type="submit" className="btn primary-btn">
              Save Changes
            </button>
            <button type="button" className="btn danger-btn" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
