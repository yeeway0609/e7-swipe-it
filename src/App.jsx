import { React } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddActivity from "@/pages/AddActivity";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
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
            <Route path="/AddActivity" element={<AddActivity />} />
          </Routes>
        </SelectedDateProvider>
      </EventIdProvider>
    </>
  );
}
