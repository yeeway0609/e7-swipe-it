import React from "react";
import EventInfoArea from "@/components/EventInfoArea";
import Smallcalender from "@/components/Smallcalender";
export default function Dashboard() {
  return (
    <>
      <Smallcalender />
      <EventInfoArea />
    </>
  );
}