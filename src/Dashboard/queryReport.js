import { format } from "date-fns";

export const queryReport = (props) => {
  const { startDate, endDate, metrics, dimensions, orderBy, filter } = props;
  const VIEW_ID = "207194869";
  return window.gapi.client.request({
    path: "/v4/reports:batchGet",
    root: "https://analyticsreporting.googleapis.com/",
    method: "POST",
    body: {
      reportRequests: [
        {
          viewId: VIEW_ID,
          filtersExpression: filter,
          dateRanges: [
            {
              startDate: format(new Date(startDate), "yyyy-MM-dd"),
              endDate: format(new Date(endDate), "yyyy-MM-dd"),
            },
          ],
          metrics: [
            {
              expression: metrics,
            },
          ],
          dimensions: [
            {
              name: dimensions,
            },
          ],
          orderBys: orderBy
            ? [
                {
                  fieldName: orderBy.fieldName,
                  sortOrder: orderBy.order,
                },
              ]
            : [],
        },
      ],
    },
  });
};
