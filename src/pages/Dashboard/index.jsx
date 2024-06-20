import "./style.sass";
import React, { useContext } from "react";
import EventInfoArea from "@/components/EventInfoArea";
import SearchPanel from "@/components/SearchPanel";
import SmallCalendar from "@/components/SmallCalendar";
import BigCalendar from "@/components/BigCalendar";
import HeatMapComponent from "@/components/HeatMap";
import NewsTrend from "@/components/NewsTrend";
import HotKeyword from "@/components/HotKeyword";
import { CalendarTabContext } from "@/context/CalendarTabContext";

export default function Dashboard() {
  const { calendarTab } = useContext(CalendarTabContext);

  return (
    <div>
      <div className="calendar-area">
        <div className="calendar-area-left">
          {(calendarTab === 1 || calendarTab === 2) ? (
            <>
              <SearchPanel />
              <SmallCalendar />
              <HeatMapComponent />
            </>
          ) : (
            <>
              <NewsTrend />
              <HotKeyword />
            </>
          )}
        </div>
        <BigCalendar/>
      </div>
      <div className="event-Info-Area">
        <EventInfoArea />
      </div>
    </div>
  );
}