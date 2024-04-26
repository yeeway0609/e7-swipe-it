import React from "react";
import "./index.css";
import SideBar from "@/components/SideBar";
import EventInfoArea from "@/components/EventInfoArea";

export default function Dashboard() {
  return (
    <div>
      <SideBar />
      <EventInfoArea />
    </div>
  );
}