import React, { useState, useEffect } from "react";
import "./App.css";
import {
  initClient,
  renderButton,
  checkSignedIn,
} from "./GoogleAuth/authUtils";
import Dashboard from "./Dashboard/dashboard";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const waitGapiLoad = () => {
      if (window.gapi.client) {
        console.log("Client loaded");
        clearInterval(window.interval);
        initClient();
      }
    };

    const waitAuth = () => {
      if (window.gapi.auth2.getAuthInstance()) {
        setIsSignedIn(checkSignedIn());
        renderButton();
        clearInterval(window.newInterval);
      }
    };
    window.interval = setInterval(waitGapiLoad, 1000);
    window.newInterval = setInterval(waitAuth, 1000);
  }, []);

  return (
    <div className="App">
      <h2>Google Analytics Dashboard</h2>
      {!isSignedIn ? <div id="signin-button"></div> : <Dashboard />}
    </div>
  );
}

export default App;
