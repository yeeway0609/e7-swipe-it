import "./style.sass";
import { React, useState } from "react";
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
      <div className="sidebar-btn" onClick={handleClick}>
        <Bars3Icon />
      </div>
      <div className={`sidebar ${isOpened ? "opened" : "closed"}`}>
        <XMarkIcon onClick={handleClick} className="close-sidebar-btn" />
        <div>
          <h1>{userName}</h1>
          <h3>專案探索</h3>
          <h3>我的專案</h3>
        </div>
        <div className="nav-links">
          <Link to="/" onClick={handleClick}>Dashboard</Link>
          <Link to="/about" onClick={handleClick}>About us</Link>
        </div>
      </div>
    </>
  );
}
