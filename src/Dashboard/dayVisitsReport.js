import React, { useState, useEffect, useCallback } from "react";
import 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { addDays } from "date-fns";
import {
  ChartWrapper,
  ReportWrapper,
  ChartTitle,
  Subtitle,
  DatepickerRow,
} from "./styles";
import CustomDatePicker from "./datepicker";
import { formatDate } from "./utils";
import { useQueryReport } from "../hooks/useQueryReport";

const DayVisitsReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [average, setAverage] = useState(0);

  const { fetchData } = useQueryReport();

  const displayResults = useCallback((response) => {
    const queryResult = response.reports[0].data.rows;
    const total = response.reports[0].data.totals[0].values[0];
    setAverage(parseInt(total / response.reports[0].data.rowCount));
    let labels = [];
    let values = [];
    queryResult.forEach((row) => {
      labels.push(formatDate(row.dimensions[0]));
      values.push(row.metrics[0].values[0]);
    });
    setReportData(prev => ({
      ...prev,
      labels,
      values,
    }));
  },[]);

  const data = {
    labels: reportData.labels,
    datasets: [
      {
        label: `${props.title} per day`,
        fill: false,
        lineTension: 0.3,
        borderColor: "#35213d",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#375751",
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
      yAxes:  {
            suggestedMin: 0,
          },
      xAxes: 
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7,
          },
        },
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        font: {
          size: 0,
        },
      },
    },
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate,
      endDate,
      metrics: props.metric,
      dimensions: ["ga:date"],
    };
    fetchData(request)
      .then((resp) => displayResults(resp))
      .catch((error) => console.error(error));
  }, [startDate, endDate, props.viewID, props.metric, fetchData, displayResults]);

  return (
    <ReportWrapper>
      <ChartTitle>{`${props.title} per day`}</ChartTitle>
      <Subtitle>{`Average - ${average} ${props.title}`}</Subtitle>
      <DatepickerRow>
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
      </DatepickerRow>
      {reportData && (
        <ChartWrapper>
          <Line data={data} options={options} width={100} height={250} />
        </ChartWrapper>
      )}
    </ReportWrapper>
  );
};

export default DayVisitsReport;
