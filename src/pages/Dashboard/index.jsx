import "./style.sass";
import React from "react";
import EventInfoArea from "@/components/EventInfoArea";
import SearchPanel from "@/components/SearchPanel";
import SmallCalendar from "@/components/SmallCalendar";
import BigCalendar from "@/components/BigCalendar";
import HeatMapComponent from "@/components/heat";

export default function Dashboard() {
  return (
    <div>
      <div className="calendar-area">
        <div className="calendar-area-left">
          <SearchPanel />
          <SmallCalendar />
          <HeatMapComponent />
        </div>
        <BigCalendar/>
      </div>
      <EventInfoArea />
    </div>
  );
}