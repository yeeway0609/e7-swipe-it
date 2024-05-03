import "./style.css";
import React from "react";
import EventInfoArea from "@/components/EventInfoArea";
import SmallCalendar from "@/components/SmallCalendar";
import BigCalendar from "@/components/BigCalendar";
import SmallcalendarSingle from "@/components/SmallcalendarSingle";

export default function Dashboard() {
  return (
    <div>
      <div className="calendar-area">
        {/* <SmallCalendar /> */}
        <SmallcalendarSingle/>
        <BigCalendar/>
      </div>
      <EventInfoArea />
    </div>
  );
}