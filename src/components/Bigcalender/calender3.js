import React from "react";
import DatePicker from "react-horizontal-datepicker";
// import "./Calender.css";

export default function App() {
  const selectedDay = (val) => {
    console.log(val);
  };
  return (
    <div className="App">
      <DatePicker
        getSelectedDay={selectedDay}
        labelFormat={"MMMM"}
        color={"#FAEBB6"}
        enableDaysBefore={2}
      />
    </div>
  );
}
