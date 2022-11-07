import React from "react";
import styled from "styled-components";
import { useAuthContext, useAuthContextAPI } from "../context/AuthContext";

const Container = styled.div`
  height: 10vh;
  background: #1c2e42;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;

  h1 {
    padding-left: 20px;
    color: #d1d8e0;
  }

  .signout {
    padding-right: 20px;
    color: #e0d5d1;
    cursor: pointer;
  }
`;

const Header = () => {
  const { token } = useAuthContext();
  const { onSetToken } = useAuthContextAPI();

  const onSignOut = () => {
    window.google.accounts.oauth2.revoke(token, () => {
      onSetToken("");
    });
  };

  return (
    <Container>
      <h1>Google Analytics Dashboard</h1>
      <div className="signout" onClick={onSignOut}>
        SIGN OUT
      </div>
    </Container>
  );
};

export default Header;
