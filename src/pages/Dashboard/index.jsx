import React from "react";
import EventInfoArea from "@/components/EventInfoArea";
import Smallcalender from "@/components/Smallcalender";
import App from "@/components/Bigcalendar";


export default function Dashboard() {
  return (
    <div>
      <Smallcalender />
      <EventInfoArea />
      <App />
    </div>
  );
}