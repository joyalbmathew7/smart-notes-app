import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const registerUser = async () => {
    setError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await api.post("users/register/", {
        username,
        email,
        password,
      });

      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);

      const apiMessage =
        error.response?.data?.detail ||
        error.response?.data ||
        error.message ||
        "Registration failed. Please try again.";

      setError(
        typeof apiMessage === "string"
          ? apiMessage
          : JSON.stringify(apiMessage)
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create an account</h1>

        <p className="auth-subtitle">
          Start saving notes and manage your profile.
        </p>

        <div className="auth-form">
          <label className="form-label">
            Username

            <input
              type="text"
              className="input-field"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label className="form-label">
            Email

            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="form-label">
            Password

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />

              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {error && <div className="error-box">{error}</div>}

          <button
            type="button"
            className="btn primary-btn"
            onClick={registerUser}
          >
            Register
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

