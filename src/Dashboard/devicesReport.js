import React, { useState, useEffect, useCallback } from "react";
import { addDays } from "date-fns";
import { Doughnut } from "react-chartjs-2";
import CustomDatePicker from "./datepicker";
import { ChartTitle, Subtitle, PieChartWrapper, colors } from "./styles";
import { useQueryReport } from "../hooks/useQueryReport";

const DevicesReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
    colors: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [totalUsers, setTotalUsers] = useState(0);

  const { fetchData } = useQueryReport();

  const displayResults = useCallback((response) => {
    const queryResult = response.reports[0].data.rows;
    const total = response.reports[0].data.totals[0].values[0];
    setTotalUsers(total);
    let labels = [];
    let values = [];
    let bgColors = [];
    queryResult.forEach((row, id) => {
      labels.push(row.dimensions[0]);
      values.push(row.metrics[0].values[0]);
      bgColors.push(colors[id + 4]);
    });
    setReportData((prev) => ({
      ...prev,
      labels,
      values,
      colors: bgColors,
    }));
  }, []);

  const data = {
    labels: reportData.labels,
    datasets: [
      {
        data: reportData.values,
        backgroundColor: reportData.colors,
      },
    ],
  };

  const options = {
    legend: { position: "bottom" },
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate,
      endDate,
      metrics: "ga:users",
      dimensions: ["ga:deviceCategory"],
    };
    setTimeout(
      () =>
        fetchData(request)
          .then((resp) => displayResults(resp))
          .catch((error) => console.error(error)),
      1500
    );
  }, [startDate, endDate, props.viewID, fetchData, displayResults]);

  return (
    <div>
      <ChartTitle>Devices by Users</ChartTitle>
      <Subtitle>{`Total Users - ${totalUsers}`}</Subtitle>
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
          <Doughnut data={data} options={options} width={300} height={300} />
        </PieChartWrapper>
      )}
    </div>
  );
};

export default DevicesReport;
