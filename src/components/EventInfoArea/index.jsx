import { React, useContext } from "react";
import { EventIdContext } from "@/context/EventIdContext";
import "./index.css";
import eventData from "@/data/events.json";


export default function EventInfoArea() {
  const eventId = useContext(EventIdContext);
  // const handleClick = (id) => {
  //   setEventId(id);
  // };

  return (
    <section className="activity_info_section">
      <div className="activity_info_section_left">
        <div className="activity_intro">
          <h3>{eventData[eventId].name}</h3>
          <p>{eventData[eventId].intro}</p>
        </div>
        <div className="ai_signal">
          ai 訊號
        </div>
      </div>
      <div className="activity_info_section_right">
        <div className="relative_events">
          <h3>相似活動</h3>
          {eventData[eventId].relatedEventsId.map((id) => {
            return <button key={id}>{eventData[id].name}</button>;
          })}
        </div>
        <div className="history_records">
          <h3>歷史紀錄</h3>
        </div>
      </div>
    </section>
  );
}
