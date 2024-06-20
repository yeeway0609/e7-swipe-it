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
        <img className="avatar" src="https://i.pinimg.com/originals/3a/56/15/3a5615d873f56649459ea70e71e2e80b.jpg" />
        <h1>{userName}</h1>
        <div className="nav-links">
          <Link to="/" onClick={handleClick}>▻ 儀表板</Link>
          <Link to="/addEvent" onClick={handleClick}>▻ 新增活動</Link>
          <Link to="/about" onClick={handleClick}>▻ 關於我們</Link>
        </div>
      </div>
    </>
  );
}
