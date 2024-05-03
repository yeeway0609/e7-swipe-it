import { React } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import SideBar from "@/components/SideBar";
import { EventIdProvider } from "@/context/EventIdContext";

export default function App() {
  return (
    <>
      <EventIdProvider>
        <SideBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </EventIdProvider>
    </>
  );
}
