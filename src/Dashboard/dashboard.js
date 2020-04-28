import React from "react";
import DayUsersReport from "./dayUsersReport";

const DashBoard = () => {

  return (
    <>
      <button onClick={() => console.log('Clicked')}>Get REPORT</button>
      <DayUsersReport />
    </>
  );
};

export default DashBoard;
