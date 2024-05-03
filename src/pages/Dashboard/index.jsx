import "./style.css";
import React from "react";
import EventInfoArea from "@/components/EventInfoArea";
import SmallCalendar from "@/components/SmallCalendar";
import BigCalendar from "@/components/BigCalendar";

export default function Dashboard() {
  return (
    <div>
      <div className="calendar-area">
        <SmallCalendar />
        <BigCalendar/>
      </div>
      <EventInfoArea />
    </div>
  );
}