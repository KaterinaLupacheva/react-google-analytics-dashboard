import React from "react";
import DatePicker from "react-datepicker";
import { DatepickerLabel, DatepickerWrapper } from "./styles";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = (props) => {
  return (
    <DatepickerWrapper>
      <DatepickerLabel>{props.placeholder}</DatepickerLabel>
      <DatePicker
        selected={props.date}
        onChange={props.handleDateChange}
        maxDate={new Date()}
        dateFormat="MMM dd, yyyy"
        className="picker"
      />
    </DatepickerWrapper>
  );
};

export default CustomDatePicker;
