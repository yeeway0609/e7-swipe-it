import React from "react";
import "./style.css";
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react'

import './styles.css'; // main css file
import './default.css'; // theme css file

const Smallcalender = () => {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleChange = (ranges) => {
    const { selection } = ranges;
    const maxRangeInDays = 7;

    const rangeDays = Math.abs((selection.endDate - selection.startDate) / (1000 * 60 * 60 * 24));

    if (rangeDays >= maxRangeInDays) {
      setDate({
        startDate: selection.startDate,
        endDate: new Date(selection.startDate.getTime() + (maxRangeInDays - 1) * 24 * 60 * 60 * 1000),
        key: 'selection'
      });
    } else {
      setDate(selection);
    }
  };

  return (
    <div className="container">
      <DateRangePicker
        className="dateRange"
        ranges={[date]}
        onChange={handleChange}
        showPreview={false}
        staticRanges={[]}
        inputRanges={[]}
      />
    </div>
  );
};

export default Smallcalender;




































// import React from "react";
// import "./style.css";
// import { DateRangePicker } from 'react-date-range';
// import { useState } from 'react'

// import './styles.css'; // main css file
// import './default.css'; // theme css file

// const Smallcalender = () => {
//   const [date, setDate] = useState({
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection',
//   });

//   const handleChange = (ranges) => {
//     const { selection } = ranges;
//     const maxRangeInDays = 7;

//     const rangeDays = Math.abs((selection.endDate - selection.startDate) / (1000 * 60 * 60 * 24));

//     if (rangeDays >= maxRangeInDays) {
//       setDate({
//         startDate: selection.startDate,
//         endDate: new Date(selection.startDate.getTime() + (maxRangeInDays - 1) * 24 * 60 * 60 * 1000),
//         key: 'selection'
//       });
//     } else {
//       setDate(selection);
//     }
//   };

//   return (
//     <div className="container">
//       <DateRangePicker
//         className="dateRange"
//         ranges={[date]}
//         onChange={handleChange}
//         showPreview={false}
//         staticRanges={[]}
//         inputRanges={[]}
//       />
//     </div>
//   );
// };

// export default Smallcalender;