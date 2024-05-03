import "./style.css";
import { React, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchPanel() {
  const [search, setSearch] = useState("");
  const activityTypes = ["工商展覽(B2B)", "工商展覽(B2C)", "藝文展覽", "藝文表演", "演唱會(大型)", "演唱會(小型)"];

  return (
    <div className="search-panel">
      <div className="search-bar">
        <MagnifyingGlassIcon className="search-icon" />
        <input type="text" />
      </div>
      <h2 className="title-activity-type">活動類型</h2>
      <div className="activity-type-list">
        {activityTypes.map((type, idx) => (
          <div key={idx} className="activity-type">
            <input type="checkbox" value={type} onChange={(e) => setSearch(e.target.value)} />
            <span>{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
