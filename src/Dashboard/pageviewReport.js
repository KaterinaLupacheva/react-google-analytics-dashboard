import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import CustomDatePicker from "./datepicker";
import { StyledTable } from "./styles";
import { queryReport } from "./queryReport";

const PageviewsReport = () => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [totalPages, setTotalPages] = useState(0);

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
    const request = {
      startDate,
      endDate,
      metrics: "ga:pageviews",
      dimensions: "ga:pagePath",
      orderBy: {
        fieldName: "ga:pageViews",
        order: "DESCENDING",
      },
      filter: "ga:pagePath!@localhost/",
    };
    queryReport(request)
      .then((resp) => displayResults(resp))
      .catch((error) => console.error(error));
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
