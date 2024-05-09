import { React } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import AddEvent from "@/pages/AddEvent";
import SideBar from "@/components/SideBar";
import { EventIdProvider } from "@/context/EventIdContext";
import { SelectedDateProvider } from "@/context/SelectedDateContext";

export default function App() {
  return (
    <>
      <EventIdProvider>
        <SelectedDateProvider>
          <SideBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path="/addEvent" element={<AddEvent />} />
          </Routes>
        </SelectedDateProvider>
      </EventIdProvider>
    </>
  );
}
