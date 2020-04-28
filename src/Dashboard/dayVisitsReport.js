import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { format, addDays } from "date-fns";
import { ChartWrapper } from "./styles";
import CustomDatePicker from "./datepicker";

const DayVisitsReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());

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
                  expression: props.metric,
                },
              ],
              dimensions: [
                {
                  name: "ga:date",
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
    let labels = [];
    let values = [];
    queryResult.forEach((row) => {
      const date = row.dimensions[0];
      labels.push(
        format(
          new Date(
            date.substring(0, 4),
            date.substring(4, 6) - 1,
            date.substring(6, 8)
          ),
          "MMM. d, yyyy"
        )
      );
      values.push(row.metrics[0].values[0]);
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
        label: `${props.title} per day`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: reportData.values,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  };

  useEffect(() => {
    queryReports();
  }, [startDate, endDate]);

  return (
    <>
      <h2>{`${props.title} per day`}</h2>
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
          <Line data={data} options={options} width={100} height={250} />
        </ChartWrapper>
      )}
    </>
  );
};

export default DayVisitsReport;
