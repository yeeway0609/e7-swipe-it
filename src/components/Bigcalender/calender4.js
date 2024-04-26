import React from "react";

import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";

const Calender4 = () => {
  const onSelectedDay = (d) => {
    console.log(d);
  };

  return (
    <ReactHorizontalDatePicker
      selectedDay={onSelectedDay}
      enableScroll={true}
      enableDays={180}
      color={"#987876"}
    />
  );
};

export default Calender4;
