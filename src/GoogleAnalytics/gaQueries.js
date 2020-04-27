export const queryReports = () => {
  const VIEW_ID = "207194869";
  window.gapi.client
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
                startDate: "7daysAgo",
                endDate: "today",
              },
            ],
            metrics: [
              {
                expression: "ga:users",
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

function displayResults(response) {
  console.log(JSON.stringify(response.result, null, 2));
}
