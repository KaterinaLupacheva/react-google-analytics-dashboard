import React, { useState, useEffect } from "react";
import "./App.css";
import { renderButton, checkSignedIn } from "./GoogleAuth/authUtils";
import Dashboard from "./Dashboard/dashboard";
import styled from "styled-components";
import Footer from "./Components/footer";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => {
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => {
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init);
  });

  return (
    <div className="App">
      {!isSignedIn ? (
        <>
          <Title>Google Analytics Dashboard</Title>
          <ButtonContainer>
            <div id="signin-button"></div>
          </ButtonContainer>
          <Footer />
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;

const ButtonContainer = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  padding-top: 10vmin;
  margin-top: 0;
`;
