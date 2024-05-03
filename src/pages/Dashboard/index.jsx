import React from "react";
import EventInfoArea from "@/components/EventInfoArea";
//import Smallcalender from "@/components/Smallcalender";
import App from "@/components/Bigcalendar";
import SmallcalendarSingle from "@/components/SmallcalendarSingle";


export default function Dashboard() {
  return (
    <div>
      <SmallcalendarSingle/>
      <EventInfoArea />
      <App />
    </div>
  );
}