import React, { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import EventsGrid from "./components/EventsGrid";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setShowLogin(false); // Hide login form after successful login
  };

  const handleCancelLogin = () => {
    setLoggedIn(false);
    setShowLogin(false); // Hide login after cancelling login
  };

  return (
    <div className="App">
      {showLogin ? (
        // Render the login form and pass the handleLoginSuccess as the login callback
        <LoginForm onLogin={handleLoginSuccess} onCancel={handleCancelLogin} />
      ) : (
        // Display the events
        <EventsGrid loggedIn={loggedIn} setShowLogin={setShowLogin} />
      )}
    </div>
  );
};

export default App;
