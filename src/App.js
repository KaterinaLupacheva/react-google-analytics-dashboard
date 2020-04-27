import React, { useEffect } from "react";
import "./App.css";
import { initClient, renderButton } from "./GoogleAuth/authUtils";

function App() {
  useEffect(() => {
    const waitGapiLoad = () => {
      if (window.gapi.client) {
        console.log("Client loaded");
        clearInterval(window.interval);
        initClient();
        renderButton();
      }
    };
    window.interval = setInterval(waitGapiLoad, 1000);
  }, []);

  return (
    <div className="App">
      <h2>Google Analytics Dashboard</h2>
      <div id="signin-button"></div>
    </div>
  );
}

export default App;
