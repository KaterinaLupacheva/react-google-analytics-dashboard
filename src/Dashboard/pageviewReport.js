import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import CustomDatePicker from "./datepicker";
import { StyledTable } from "./styles";

const PageviewsReport = () => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [totalPages, setTotalPages] = useState(0);

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
              filtersExpression: "ga:pagePath!@localhost/",
              dateRanges: [
                {
                  startDate: format(new Date(startDate), "yyyy-MM-dd"),
                  endDate: format(new Date(endDate), "yyyy-MM-dd"),
                },
              ],
              metrics: [
                {
                  expression: "ga:pageviews",
                },
              ],
              dimensions: [
                {
                  name: "ga:pagePath",
                },
              ],
              orderBys: [
                {
                  fieldName: "ga:pageViews",
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
    setTotalPages(queryResult.length);
    const total = response.result.reports[0].data.totals[0].values[0];
    let newReportData = [];
    queryResult.forEach((row, idx) => {
      if (idx < 10) {
        let tempObj = {
          path: row.dimensions[0],
          views: row.metrics[0].values[0],
          perc: `${parseFloat((row.metrics[0].values[0] / total) * 100).toFixed(
            1
          )}%`,
        };
        newReportData.push(tempObj);
      }
    });
    setReportData(newReportData);
  };

  useEffect(() => {
    queryReports();
  }, [startDate, endDate]);

  return (
    <>
      <h2>Top 10 Pages by Views</h2>
      <h4>{`Total pages - ${totalPages}`}</h4>
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
      {reportData.length && (
        <StyledTable>
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, id) => (
              <tr key={id}>
                <td className="left-align">{row.path}</td>
                <td>{row.views}</td>
                <td>{row.perc}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </>
  );
};

export default PageviewsReport;
