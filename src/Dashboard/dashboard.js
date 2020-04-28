import React from "react";
import DayVisitsReport from "./dayVisitsReport";

const DashBoard = () => {
  return (
    <>
      <DayVisitsReport metric={"ga:users"} title={"Users"} />
      <DayVisitsReport metric={"ga:sessions"} title={"Sessions"} />
    </>
  );
};

export default DashBoard;
