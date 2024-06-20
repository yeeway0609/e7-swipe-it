import { React } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import AddEvent from "@/pages/AddEvent";
import SideBar from "@/components/SideBar";
import { EventIdProvider } from "@/context/EventIdContext";
import { EventFilterProvider } from "@/context/EventFilterContext";
import { SelectedDateProvider } from "@/context/SelectedDateContext";
import { CalendarTabProvider } from "@/context/CalendarTabContext";

export default function App() {
  return (
    <>
      <CalendarTabProvider>
        <EventIdProvider>
          <EventFilterProvider>
            <SelectedDateProvider>
              <SideBar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path='/about' element={<About />} />
                <Route path="/addEvent" element={<AddEvent />} />
              </Routes>
            </SelectedDateProvider>
          </EventFilterProvider>
        </EventIdProvider>
      </CalendarTabProvider>
    </>
  );
}
