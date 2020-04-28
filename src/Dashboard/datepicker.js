import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = (props) => {
  return (
    <>
      <label>{props.placeholder}</label>
      <DatePicker
        selected={props.date}
        onChange={props.handleDateChange}
        maxDate={new Date()}
      />
    </>
  );
};

export default CustomDatePicker;
