import { React } from "react";
import "./App.css";
import Header from "@/components/Header";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import {Routes, Route} from "react-router-dom";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  );
}
