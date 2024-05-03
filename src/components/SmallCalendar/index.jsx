import { React, useState, useContext} from "react";
import { Calendar } from "react-date-range";
import { SelectedDateContext } from "@/context/SelectedDateContext";
import "./style.css";
import "./default.css";

export default function SmallCalendar() {
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);
  const [date, setDate] = useState(null);

  return (
    <div className="container">
      <Calendar
        date={date}
        onChange={item => {
          setDate(item);
          setSelectedDate(item);
          console.log(selectedDate);
        }}
      />
    </div>
  );
}