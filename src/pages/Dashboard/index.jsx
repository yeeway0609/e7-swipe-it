import "./style.css";
import React from "react";
import EventInfoArea from "@/components/EventInfoArea";
import Smallcalender from "@/components/Smallcalender";
import BigCalendar from "@/components/BigCalendar";

export default function Dashboard() {
  return (
    <div>
      <div className="calendar-area">
        <Smallcalender />
        <BigCalendar/>
      </div>
      <EventInfoArea />
    </div>
  );
}