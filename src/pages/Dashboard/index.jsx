import "./style.css";
import React from "react";
import EventInfoArea from "@/components/EventInfoArea";
import SmallCalender from "@/components/SmallCalender";
import BigCalendar from "@/components/BigCalendar";

export default function Dashboard() {
  return (
    <div>
      <div className="calendar-area">
        <SmallCalender />
        <BigCalendar/>
      </div>
      <EventInfoArea />
    </div>
  );
}