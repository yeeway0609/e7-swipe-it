import { React } from "react";
import "./App.css";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import {Routes, Route} from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  );
}
