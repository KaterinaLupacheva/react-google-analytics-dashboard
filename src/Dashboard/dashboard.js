import React from "react";
import DayVisitsReport from "./dayVisitsReport";
import CountriesReport from "./countriesReport";
import PageviewsReport from "./pageviewReport";
import SourceReport from "./sourceReport";
import BrowsersReport from "./browsersReport";
import DevicesReport from "./devicesReport";

const DashBoard = () => {
  return (
    <>
      <DayVisitsReport metric={"ga:users"} title={"Users"} />
      <DayVisitsReport metric={"ga:sessions"} title={"Sessions"} />
      <CountriesReport />
      <PageviewsReport />
      <SourceReport />
      <BrowsersReport />
      <DevicesReport />
    </>
  );
};

export default DashBoard;
