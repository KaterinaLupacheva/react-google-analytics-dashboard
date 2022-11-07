# Custom Google Analytics Dashboard

Custom Google Analytics Dashboard based on Google Analytics Reporting API v4 with OAuth2, charts and tables.

<p float="left">
    <img src="src/assets/images/users.JPG" alt="users visits" width="200" height="90"/>
    <img src="src/assets/images/sessions.JPG" alt="users sessions" width="200" height="90"/>
    <img src="src/assets/images/countries.JPG" alt="countries" width="200" height="90"/>
    <img src="src/assets/images/sources.JPG" alt="sources" width="200" height="90"/>
    <img src="src/assets/images/pages.JPG" alt="pageviews" width="200" height="90"/>
    <img src="src/assets/images/browsers-devices.JPG" alt="browsers and devices" width="200" height="90"/>
</p>

## Technologies used

- [React.js](https://reactjs.org/)
- [Google Analytics API](https://developers.google.com/analytics/devguides/reporting/core/v4)
- [React Charts](https://github.com/jerairrest/react-chartjs-2)
- [Styled Components](https://styled-components.com/)

## Run the app locally

1. Clone this repo
2. Create project in [Google Developers Console](https://console.developers.google.com/)
3. Enable Google Analytics Reporting API.
4. Configure Google OAuth consent screen.
5. Add your CLIENT_ID into .env file:
   REACT_APP_CLIENT_ID='YOUR_CLIENT_ID'
6. Run `npm install`
7. Run `npm start`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The blog post [How to develop a custom Google Analytics Dashboard using Google Analytics Reporting API v4 and React.js (VERSION 2020)](https://ramonak.io/posts/react-google-analytics-dashboard).
