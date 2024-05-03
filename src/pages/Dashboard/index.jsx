import React from "react";
import EventInfoArea from "@/components/EventInfoArea";
import Smallcalender from "@/components/Smallcalender";
import HeatMapComponent from "@/components/heat";


export default function Dashboard() {
  return (
    <div>
      <Smallcalender />
      <HeatMapComponent />
      <EventInfoArea />
      
    </div>
  );
}