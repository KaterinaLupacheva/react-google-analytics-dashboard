import React from "react";
import styled from "styled-components";
import { GoMarkGithub } from "react-icons/go";
import logo from "../assets/logo.png";

const Footer = () => (
  <FooterContainer>
    <div className="developed">
      {`Developed by `}
      <a href="https://ramonak.io" target="_blank" rel="noopener noreferrer">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        {`Katsiaryna (Kate) Lupachova`}
      </a>
    </div>
    <div className="source">
      <a
        href="https://github.com/KaterinaLupacheva/react-google-analytics-dashboard"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GoMarkGithub />
        {`Source `}
      </a>
    </div>
  </FooterContainer>
);

export default Footer;

const FooterContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  font-weight: 500;
  color: #4b2f57;

  a {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #4b2f57;
  }

  .developed {
    margin-left: 1vw;
    display: flex;
    flex-direction: row;
    align-items: center;

    .logo-container {
      width: 50px;
      height: 100%;
      padding: 0 20px;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  .source {
    margin-right: 2vw;

    svg {
      margin-right: 0.5vw;
    }
  }
`;
