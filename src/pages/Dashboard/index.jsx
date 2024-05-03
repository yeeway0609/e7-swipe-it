import React from "react";
import EventInfoArea from "@/components/EventInfoArea";
import Smallcalender from "@/components/Smallcalender";
import BigCalendar from "@/components/BigCalendar";

export default function Dashboard() {
  return (
    <div>
      <Smallcalender />
      <BigCalendar/>
      <EventInfoArea />
    </div>
  );
}