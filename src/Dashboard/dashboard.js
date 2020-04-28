import React from "react";
import DayVisitsReport from "./dayVisitsReport";
import CountriesReport from './countriesReport';

const DashBoard = () => {
  return (
    <>
      <DayVisitsReport metric={"ga:users"} title={"Users"} />
      <DayVisitsReport metric={"ga:sessions"} title={"Sessions"} />
      <CountriesReport />
    </>
  );
};

export default DashBoard;
