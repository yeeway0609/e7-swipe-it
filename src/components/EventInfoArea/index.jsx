import { React, useState, useContext } from "react";
import { EventIdContext } from "@/context/EventIdContext";
import { StarIcon as NotFavoriteIcon } from "@heroicons/react/24/outline";
import { StarIcon as FavoriteIcon } from "@heroicons/react/24/solid";
import "./index.css";
import eventData from "@/data/events.json";


export default function EventInfoArea() {
  const eventId = useContext(EventIdContext);
  const [favorite, setFavorite] = useState(false);
  const aiSignalTab = ["交通", "住宿", "票券", "飲食"];
  const [aiTabActive, setAiTabActive] = useState("交通");
  const historyTab = ["歷史1", "歷史2", "歷史3", "歷史4"];
  const [historyTabActive, setHistoryTabActive] = useState("歷史1");

  return (
    <section className="activity_info_section">
      <div className="activity_info_section_left">
        <div className="activity_intro">
          <div className="activity_intro_title">
            <h3>{eventData[eventId].name}</h3>
            {favorite
              ? <FavoriteIcon className="star_icon" onClick={() => setFavorite(false)} />
              : <NotFavoriteIcon className="star_icon" onClick={() => setFavorite(true)} />}
          </div>
          <p>{eventData[eventId].intro}</p>
        </div>
        <div className="ai_signal">
          <ul className="tab_bar">
            {aiSignalTab.map((tab) => {
              return (
                <li
                  key={tab}
                  onClick={() => setAiTabActive(tab)}
                  className={tab == aiTabActive ? "active" : ""}
                >
                  {tab}
                </li>
              );
            })}
          </ul>
          <div className="ai_signal_info">
            ai 訊號
          </div>
        </div>
      </div>
      <div className="activity_info_section_right">
        <div className="related_events">
          <h3>相似活動</h3>
          {eventData[eventId].relatedEventsId.map((id) => {
            return <button key={id} className="related_event_badge">{eventData[id].name}</button>;
          })}
        </div>
        <div className="history_records">
          <ul className="tab_bar">
            {historyTab.map((tab) => {
              return (
                <li
                  key={tab}
                  onClick={() => setHistoryTabActive(tab)}
                  className={tab == historyTabActive ? "active" : ""}
                >
                  {tab}
                </li>
              );
            })}
          </ul>
          <div className="history_records_info">
            歷史紀錄
          </div>
        </div>
      </div>
    </section>
  );
}
