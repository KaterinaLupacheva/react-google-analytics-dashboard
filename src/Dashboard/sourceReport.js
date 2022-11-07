import React, { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { addDays, format } from "date-fns";
import CustomDatePicker from "./datepicker";
import { formatDate, transformToDate } from "./utils";
import {
  ChartTitle,
  ReportWrapper,
  Subtitle,
  DatepickerRow,
  ChartWrapper,
  colors,
} from "./styles";
import { useQueryReport } from "../hooks/useQueryReport";

const SourceReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    datasets: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [totalSources, setTotalSources] = useState(0);

  const { fetchData } = useQueryReport();

  const transformAPIData = (data) => {
    let transformedData = [];
    let datesArray = [];
    data.forEach((row) => {
      transformedData.push({
        date: formatDate(row.dimensions[1]),
        source: row.dimensions[0],
        visits: row.metrics[0].values[0],
      });
      datesArray.push(transformToDate(row.dimensions[1]));
    });
    return [transformedData, datesArray];
  };

  const groupDataBySource = (data) => {
    return data.reduce((r, a) => {
      r[a.source] = r[a.source] || [];
      r[a.source].push(a);
      return r;
    }, Object.create(null));
  };

  const sortSourcesByTotalVisits = (data) => {
    let sumedVisits = [];
    for (let [key, value] of Object.entries(data)) {
      const sumOfVisits = value.reduce((a, b) => {
        return a + parseInt(b.visits);
      }, 0);
      sumedVisits.push({
        source: key,
        visits: sumOfVisits,
      });
    }
    return sumedVisits.sort((a, b) => b.visits - a.visits);
  };

  const createDataForChart = (datesArray, sumedVisits, groupedBySource) => {
    datesArray.sort((a, b) => {
      return new Date(a) - new Date(b);
    });
    const datesFormatted = datesArray.map((date) =>
      format(new Date(date), "MMM. d, yyyy")
    );
    const uniqueDates = [...new Set(datesFormatted)];
    let datasetsArray = [];
    let i = 0;
    sumedVisits.forEach((item, id) => {
      if (id < 5) {
        const label = item.source;
        const backgroundColor = colors[i + 3];
        i++;
        let data = [];
        uniqueDates.forEach((date) => {
          const row = groupedBySource[item.source].find(
            (item) => item.date === date
          );
          if (row) {
            data.push(parseInt(row.visits));
          } else {
            data.push(0);
          }
        });
        datasetsArray.push({
          label,
          backgroundColor,
          data,
        });
      }
    });
    return { labels: uniqueDates, data: datasetsArray };
  };

  const displayResults = useCallback((response) => {
    const queryResult = response.reports[0].data.rows;

    const data = transformAPIData(queryResult);
    let transformedData = data[0];
    let datesArray = data[1];

    const groupedBySource = groupDataBySource(transformedData);
    setTotalSources(Object.keys(groupedBySource).length);

    const sumedVisits = sortSourcesByTotalVisits(groupedBySource);

    const dataForChart = createDataForChart(
      datesArray,
      sumedVisits,
      groupedBySource
    );

    setReportData((prev) => ({
      ...prev,
      labels: dataForChart.labels,
      datasets: dataForChart.data,
    }));
  }, []);

  const options = {
    tooltips: {
      displayColors: true,
      callbacks: {
        mode: "x",
      },
    },
    scales: {
      xAxes: {
        stacked: true,
        gridLines: {
          display: false,
        },
      },
      yAxes: {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
        type: "linear",
      },
    },
    maintainAspectRatio: false,
    legend: { position: "bottom" },
    plugins: {
      datalabels: {
        font: {
          size: 0,
        },
      },
    },
  };

  const data = {
    labels: reportData.labels,
    datasets: reportData.datasets,
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate,
      endDate,
      metrics: "ga:users",
      dimensions: ["ga:source", "ga:date"],
    };
    setTimeout(
      () =>
        fetchData(request)
          .then((resp) => displayResults(resp))
          .catch((error) => console.error(error)),
      1100
    );
  }, [startDate, endDate, props.viewID, fetchData, displayResults]);

  return (
    <ReportWrapper>
      <ChartTitle>Top 5 Sources of Visits</ChartTitle>
      <Subtitle>{`Total sources - ${totalSources}`}</Subtitle>
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
          <Bar data={data} width={100} height={250} options={options} />
        </ChartWrapper>
      )}
    </ReportWrapper>
  );
};

export default SourceReport;
