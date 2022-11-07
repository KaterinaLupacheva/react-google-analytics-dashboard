import { useEffect } from "react";
import Dashboard from "../Dashboard/dashboard";
import styled from "styled-components";
import Footer from "./footer";
import { useAuthContext } from "../context/AuthContext";
import { useAuthContextAPI } from "../context/AuthContext";

export default function Home() {
  const { token, client } = useAuthContext();
  const { onInitClient, onSetToken } = useAuthContextAPI();

  const onGetToken = () => {
    client.requestAccessToken();
  }

  useEffect(() => {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      callback: (tokenResponse) => {
        onSetToken(tokenResponse.access_token);
      },
    });
    onInitClient(client);
  }, [onInitClient, onSetToken]);

  return (
    <div className="App">
      {!token ? (
        <>
          <Title>Google Analytics Dashboard</Title>
          <ButtonContainer>
            <button onClick={onGetToken}>Get access token</button>
          </ButtonContainer>
          <Footer />
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

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
