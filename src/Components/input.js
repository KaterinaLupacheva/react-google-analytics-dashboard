import React, { useState } from "react";
import styled from "styled-components";
import { FaRegQuestionCircle } from "react-icons/fa";

const InputField = ({ submitViewId }) => {
  const [viewID, setViewID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submitViewId(viewID);
  };
  return (
    <InputRow>
      <form>
        <input
          type="text"
          name="viewid"
          value={viewID}
          onChange={(e) => setViewID(e.target.value)}
          placeholder="Enter viewID"
        />
        <button type="submit" onClick={handleSubmit}>
          SUBMIT
        </button>
        <a
          href="https://stackoverflow.com/questions/36898103/what-is-a-viewid-in-google-analytics"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaRegQuestionCircle />
        </a>
      </form>
    </InputRow>
  );
};

export default InputField;

const InputRow = styled.div`
  padding-top: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;

  input {
    line-height: 7vh;
    border-radius: 20px;
    border: 1px solid #4b2f57;
    font-size: 1.5rem;
    width: 15vw;
  }

  button {
    margin: 0 7px 0 20px;
    height: 7vh;
    border-radius: 20px;
    border: 1px solid #4b2f57;
    font-size: 1.5rem;
    background-color: #1c2e42;
    color: #d1d8e0;
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }
`;
