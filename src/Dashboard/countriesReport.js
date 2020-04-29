import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { PieChartWrapper } from "./styles";
import { format, addDays } from "date-fns";
import CustomDatePicker from "./datepicker";

const CountriesReport = () => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [totalCoutries, setTotalCountries] = useState(0);

  const queryReports = () => {
    const VIEW_ID = "207194869";
    return window.gapi.client
      .request({
        path: "/v4/reports:batchGet",
        root: "https://analyticsreporting.googleapis.com/",
        method: "POST",
        body: {
          reportRequests: [
            {
              viewId: VIEW_ID,
              dateRanges: [
                {
                  startDate: format(new Date(startDate), "yyyy-MM-dd"),
                  endDate: format(new Date(endDate), "yyyy-MM-dd"),
                },
              ],
              metrics: [
                {
                  expression: "ga:users",
                },
              ],
              dimensions: [
                {
                  name: "ga:country",
                },
              ],
              orderBys: [
                {
                  fieldName: "ga:users",
                  sortOrder: "DESCENDING",
                },
              ],
            },
          ],
        },
      })
      .then(displayResults, console.error.bind(console));
  };

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    setTotalCountries(queryResult.length);
    let labels = [];
    let values = [];
    queryResult.forEach((row, idx) => {
      if (idx < 5) {
        labels.push(row.dimensions[0]);
        values.push(row.metrics[0].values[0]);
      }
    });
    setReportData({
      ...reportData,
      labels,
      values,
    });
  };

  const data = {
    labels: reportData.labels,
    datasets: [
      {
        data: reportData.values,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#af78cf",
          "#8bcf78",
        ],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  useEffect(() => {
    queryReports();
  }, [startDate, endDate]);

  return (
    <>
      <h2>Top 5 Countries by Users</h2>
      <h4>{`Total countries - ${totalCoutries}`}</h4>
      <CustomDatePicker
        placeholder={"Start date"}
        date={startDate}
        handleDateChange={(date) => setStartDate(date)}
      />
      <CustomDatePicker
        placeholder={"End date"}
        date={endDate}
        handleDateChange={(date) => setEndDate(date)}
      />
      {reportData && (
        <PieChartWrapper>
          <Pie data={data} />
        </PieChartWrapper>
      )}
    </>
  );
};

export default CountriesReport;
