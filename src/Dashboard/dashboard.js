import React, { useState } from "react";
import DayVisitsReport from "./dayVisitsReport";
import CountriesReport from "./countriesReport";
import PageviewsReport from "./pageviewReport";
import SourceReport from "./sourceReport";
import BrowsersReport from "./browsersReport";
import DevicesReport from "./devicesReport";
import Header from "../Components/header";
import { LastRow } from "./styles";
import InputField from "../Components/input";

const DashBoard = () => {
  const [viewID, setViewID] = useState(null);

  return (
    <>
      <Header />
      {viewID ? (
        <>
          <DayVisitsReport
            metric={"ga:users"}
            title={"Users"}
            viewID={viewID}
          />
          <DayVisitsReport
            metric={"ga:sessions"}
            title={"Sessions"}
            viewID={viewID}
          />
          <CountriesReport viewID={viewID} />
          <PageviewsReport viewID={viewID} />
          <SourceReport viewID={viewID} />
          <LastRow>
            <BrowsersReport viewID={viewID} />
            <DevicesReport viewID={viewID} />
          </LastRow>
        </>
      ) : (
        <InputField submitViewId={(id) => setViewID(id)} />
      )}
    </>
  );
};

export default DashBoard;
