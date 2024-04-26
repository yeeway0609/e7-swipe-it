import React from "react";
import "./style.css";
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react'

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Smallcalender = () => {
  const [date, setDate] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
  });
  const handleChange = (ranges) => {
    setDate(ranges.selection)
  }
  return(
    <div className="container">
      <DateRangePicker className="dateRange" ranges={[date]} 
      onChange={handleChange}/>
    </div>
  );
};

export default Smallcalender;



/*export default function Smallcalender() {
  return (
    <nav className="calender">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      />
    </nav>
  );
}
*/