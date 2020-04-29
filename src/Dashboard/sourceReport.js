import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartWrapper } from "./styles";
import { addDays } from "date-fns";
import CustomDatePicker from "./datepicker";
import { queryReport } from "./queryReport";
import { formatDate } from "./utils";

const SourceReport = () => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [totalSources, setTotalSources] = useState(0);

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    // console.log(response.result.reports[0].data)
    let transformedData = [];
    queryResult.forEach((row) => {
      transformedData.push({
        date: formatDate(row.dimensions[1]),
        source: row.dimensions[0],
        visits: row.metrics[0].values[0],
      });
    });
    console.log(transformedData);

    // setTotalCountries(queryResult.length);
    // let labels = [];
    // let values = [];
    // queryResult.forEach((row, idx) => {
    //   if (idx < 5) {
    //     labels.push(row.dimensions[0]);
    //     values.push(row.metrics[0].values[0]);
    //   }
    // });
    // setReportData({
    //   ...reportData,
    //   labels,
    //   values,
    // });
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  useEffect(() => {
    const request = {
      startDate,
      endDate,
      metrics: "ga:users",
      dimensions: ["ga:source", "ga:date"],
    };
    queryReport(request)
      .then((resp) => displayResults(resp))
      .catch((error) => console.error(error));
  }, [startDate, endDate]);

  return (
    <>
      <h2>Top 5 Sources of Visits</h2>
      <h4>{`Total countries - ${totalSources}`}</h4>
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
        <ChartWrapper>
          <Bar
            data={data}
            width={100}
            height={250}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </ChartWrapper>
      )}
    </>
  );
};

export default SourceReport;
