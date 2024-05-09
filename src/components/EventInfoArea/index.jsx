import "./style.sass";
import { React, useState, useContext } from "react";
import { EventIdContext } from "@/context/EventIdContext";
import { StarIcon as NotFavoriteIcon } from "@heroicons/react/24/outline";
import { StarIcon as FavoriteIcon } from "@heroicons/react/24/solid";
import CanvasJSReact from '@canvasjs/react-charts';
import eventData from "@/data/events.json";


export default function EventInfoArea() {
  const { eventId, setEventId } = useContext(EventIdContext);
  const [favorite, setFavorite] = useState(false);
  const aiSignalTab = ["交通", "住宿", "票券", "飲食"];
  const [aiTabActive, setAiTabActive] = useState("交通");
  const historyTab = ["歷史1", "歷史2", "歷史3", "歷史4"];
  const [historyTabActive, setHistoryTabActive] = useState("歷史1");

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "AI推薦訊號"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: [
        { y: 18, label: "Direct" },
        { y: 49, label: "Organic Search" },
        { y: 9, label: "Paid Search" },
        { y: 5, label: "Referral" },
        { y: 19, label: "Social" }
      ]
    }]
  }
  return (
    <section className="activity-info-section">
      <div className="activity-info-section-left">
        <div className="activity-intro">
          <div className="activity-intro-title">
            <h3>{eventData[eventId].name}</h3>
            {favorite
              ? <FavoriteIcon className="star-icon" onClick={() => setFavorite(false)} />
              : <NotFavoriteIcon className="star-icon" onClick={() => setFavorite(true)} />}
          </div>
          <p>{eventData[eventId].intro}</p>
        </div>
        <div className="ai-signal">
          <ul className="tab-bar">
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
          <div className="ai-signal-info">
            <div className="pie">
              <CanvasJSChart options = {options}
              /* onRef={ref => this.chart = ref} */
              />
              {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
          </div>
        </div>
      </div>
      <div className="activity-info-section-right">
        <div className="related-events">
          <h3>相似活動</h3>
          {eventData[eventId].relatedEventsId.map((id) => {
            return (
              <button
                key={id}
                className="related-event-badge"
                onClick={() => setEventId(id)}
              >
                {eventData[id].name}
              </button>);
          })}
        </div>
        <div className="history-records">
          <ul className="tab-bar">
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
          <div className="history-records-info">
            歷史紀錄
          </div>
        </div>
      </div>
    </section>
  );
}
