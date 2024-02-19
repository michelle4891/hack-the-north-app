import React, { useState } from "react";

interface Props {
  onLogin: () => void; // Callback function when login is successful
  onCancel: () => void; // Callback function when login cancelled
}

const LoginForm: React.FC<Props> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded credentials for demonstration
    if (username === "admin" && password === "password") {
      onLogin(); // Invoke the callback to notify parent component
    } else {
      setError("*Invalid username or password");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    // Call handleSubmit function if user presses enter key while on login form
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => handleKeyDown(e)}
        style={{
          border: "solid white",
          padding: "30px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h3>Log In</h3>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label>Username:</label>
          <input
            className="outlined-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label>Password:</label>
          <input
            className="outlined-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          <button className="white-button" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="white-button"
          >
            Log In
          </button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
