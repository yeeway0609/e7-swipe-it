import "./style.css";
import React from "react";
import EventInfoArea from "@/components/EventInfoArea";
import SearchPanel from "@/components/SearchPanel";
import SmallCalendar from "@/components/SmallCalendar";
import BigCalendar from "@/components/BigCalendar";

export default function Dashboard() {
  return (
    <div>
      <div className="calendar-area">
        <div className="calendar-area-left">
          <SearchPanel />
          <SmallCalendar />
        </div>
        <BigCalendar/>
      </div>
      <EventInfoArea />
    </div>
  );
}