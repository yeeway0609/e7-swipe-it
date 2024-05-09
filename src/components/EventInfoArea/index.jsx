import "./style.sass";
import { React, useState, useContext } from "react";
import { EventIdContext } from "@/context/EventIdContext";
import { StarIcon as NotFavoriteIcon } from "@heroicons/react/24/outline";
import { StarIcon as FavoriteIcon } from "@heroicons/react/24/solid";
import CanvasJSReact from '@canvasjs/react-charts';
import eventData from "@/data/events.json";
import PieChartData from "@/data/PieChartData.json";
import { connect } from "bun";

export default function EventInfoArea() {
  const { eventId, setEventId } = useContext(EventIdContext);
  const [favorite, setFavorite] = useState(false);
  const aiSignalTab = ["交通", "住宿", "票券", "飲食"];
  const [aiTabActive, setAiTabActive] = useState("交通");
  const historyTab = ["歷史1", "歷史2", "歷史3", "歷史4"];
  const [historyTabActive, setHistoryTabActive] = useState("歷史1");

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  var CanvasJSChartRight = CanvasJSReact.CanvasJSChart;

  const options = {
    //exportEnabled: true,
    animationEnabled: true,
    interactivityEnabled: false,
    colorSet:"redShades",
    title: {
      text: "AI推薦訊號"
    },
   
    data: [{
      type: "pie",
      startAngle: 75,
      legendText: "{label}",
      indexLabelFontSize: 16,
      width: 30 ,
      dataPoints:PieChartData//json
    }]

  }
  const optionss = {
    //exportEnabled: true,
    animationEnabled: true,
    interactivityEnabled: false,
    colorSet:"redShades",
    // title: {
    //   text: "歷史紀錄~"
    // },
   
    data: [{
      type: "pie",
      startAngle: 75,
      legendText: "{label}",
      indexLabelFontSize: 16,
      width: 30 ,
      dataPoints:PieChartData//json
    }]
  }
  CanvasJS.addColorSet("redShades",
  [//colorSet Array
  "#FF0000", // Red
  "#FF6347", // Tomato
  "#FF4500", // OrangeRed
  "#DC143C", // Crimson
  "#B22222", // FireBrick
  "#8B0000", // DarkRed
  "#A52A2A", // Brown
  "#D2691E", // Chocolate
  "#CD5C5C", // IndianRed
  "#F08080"  // LightCoral               
  ]);


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
            <CanvasJSChart options = {options}/>
              {/* <CanvasJSChart options = {options}
                // onRef={ref => this.chart = ref}
              /> */}
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
         {/* add pie right   */}
         <div className="right_pie">
         <CanvasJSChart options = {optionss}/>
         </div>
         
        </div>
      </div>
      
    </section>
    
  );
}
