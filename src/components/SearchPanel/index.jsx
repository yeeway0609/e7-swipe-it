// import "./style.css";
import "./style.sass";
import { React, useContext } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { EventFilterContext } from "@/context/EventFilterContext";

export default function SearchPanel() {
  const { eventFilter, setEventFilter } = useContext(EventFilterContext);
  const activityTypes = ["工商展覽(B2B)", "工商展覽(B2C)", "藝文展覽", "藝文表演", "演唱會(大型)", "演唱會(小型)"];
  const handleSearch = (e) => {
    const { name, value, checked } = e.target;

    if (name === "search") {
      setEventFilter((prev) => ({ ...prev, name: value }));
    } else if (name === "activityType") {
      setEventFilter((prev) => {
        const types = prev.type ? [...prev.type] : [];
        if (checked) {
          types.push(value);
        } else {
          const index = types.indexOf(value);
          if (index > -1) types.splice(index, 1);
        }
        
        return { ...prev, type: types };
      });
    }
  };

  return (
    <div className="search-panel">
      <div className="search-bar">
        <MagnifyingGlassIcon className="search-icon" />
        <input
          type="text"
          name="search"
          value={eventFilter.name}
          onChange={handleSearch}
          placeholder="搜索活動..."
        />
      </div>
      <h2 className="title-activity-type">活動類型</h2>
      <div className="activity-type-list">
        {activityTypes.map((type, idx) => (
          <div key={idx} className="activity-type">
            <input
              type="checkbox"
              name="activityType"
              value={type}
              checked={eventFilter.type.includes(type)}
              onChange={handleSearch}
            />
            <span>{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
