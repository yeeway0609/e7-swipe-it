import { React, useState } from "react";
import "./index.css";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function SideBar() {
  const userName = "派大星";
  const [isOpened, setIsOpened] = useState(false);
  
  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <>
      <div className="sidebar_btn" onClick={handleClick}>
        <Bars3Icon />
      </div>
      <div className={`sidebar ${isOpened ? "opened" : "closed"}`}>
        <XMarkIcon onClick={handleClick} className="close_sidebar_btn" />
        <h1>{userName}</h1>
        <h2>專案探索</h2>
        <h2>我的專案</h2>
        <Link to="/">
          <p>Dashboard</p>
        </Link>
        <Link to="/about">
          <p>About us</p>
        </Link>
      </div>
    </>
  );
}
