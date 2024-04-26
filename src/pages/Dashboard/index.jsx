import React from "react";
import "./index.css";
import SideBar from "@/components/SideBar";
import EventInfoArea from "@/components/EventInfoArea";
import Smallcalender from "@/components/Smallcalender";
export default function Dashboard() {
  return (
    <div>
      <Smallcalender />
      <SideBar />
      <EventInfoArea />
    </div>
  );
}