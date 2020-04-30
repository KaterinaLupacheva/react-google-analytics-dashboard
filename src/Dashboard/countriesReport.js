import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { PieChartWrapper, colors } from "./styles";
import { addDays } from "date-fns";
import CustomDatePicker from "./datepicker";
import { queryReport } from "./queryReport";
import { ChartTitle, ReportWrapper, Subtitle, DatepickerRow } from "./styles";
import "chartjs-plugin-datalabels";

const CountriesReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
    colors: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [totalCoutries, setTotalCountries] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    setTotalUsers(response.result.reports[0].data.totals[0].values[0]);
    setTotalCountries(queryResult.length);
    let labels = [];
    let values = [];
    let bgColors = [];
    queryResult.forEach((row, idx) => {
      if (idx < 5) {
        labels.push(row.dimensions[0]);
        values.push(row.metrics[0].values[0]);
        bgColors.push(colors[idx + 1]);
      }
    });
    setReportData({
      ...reportData,
      labels,
      values,
      colors: bgColors,
    });
  };

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
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return data.labels[tooltipItem["index"]];
        },
      },
    },
    plugins: {
      datalabels: {
        color: "black",
        font: {
          size: 20,
        },
        formatter: function (value, context) {
          const perc = parseInt((value / totalUsers) * 100);
          return perc + "%";
        },
      },
    },
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate,
      endDate,
      metrics: "ga:users",
      dimensions: ["ga:country"],
      orderBy: {
        fieldName: "ga:users",
        order: "DESCENDING",
      },
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => displayResults(resp))
          .catch((error) => console.error(error)),
      1000
    );
  }, [startDate, endDate]);

  return (
    <ReportWrapper>
      <ChartTitle>Top 5 Countries by Users</ChartTitle>
      <Subtitle>{`Total countries - ${totalCoutries}`}</Subtitle>
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
        <PieChartWrapper>
          <Pie data={data} options={options} />
        </PieChartWrapper>
      )}
    </ReportWrapper>
  );
};

export default CountriesReport;
