import "./style.sass";
import { React, useState, useContext, useEffect } from "react";
import { EventIdContext } from "@/context/EventIdContext";
import { StarIcon as NotFavoriteIcon } from "@heroicons/react/24/outline";
import { StarIcon as FavoriteIcon } from "@heroicons/react/24/solid";
import CanvasJSReact from "@canvasjs/react-charts";
import PieChartData from "@/data/PieChartData.json";
import RightChartData from "@/data/RightChartData.json";

export default function EventInfoArea() {
  const {eventId, setEventId} = useContext(EventIdContext);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState(null);

  async function fetchEventByID(id) {
    try {
      const response = await fetch(`http://luffy.ee.ncku.edu.tw:4445/events/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching events\' info:', error);
    }
  }

  async function handleCurrentEvent() {
    const data = await fetchEventByID(eventId);
    setCurrentEvent(data);

    if (data && data.related_events_id) {
      const relatedEventsIds = JSON.parse(data.related_events_id);
      const relatedEventsPromises = relatedEventsIds.map(id => fetchEventByID(id));
      const relatedEventsData = await Promise.all(relatedEventsPromises);
      setRelatedEvents(relatedEventsData);
    }
  }

  useEffect(() => {
    handleCurrentEvent();
  }, [eventId]);

  const [favorite, setFavorite] = useState(false);
  const aiSignalTab = ["交通", "住宿", "票券", "飲食"];
  const [aiTabActive, setAiTabActive] = useState("交通");
  const historyTab = ["歷史1", "歷史2", "歷史3", "歷史4"];
  const [historyTabActive, setHistoryTabActive] = useState("歷史1");

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  var CanvasJSChartRight = CanvasJSReact.CanvasJSChart;
  const options = {
    animationEnabled: true,
    interactivityEnabled: true,
    highlightEnabled: true,
    explodeOnClick: true,
    colorSet:"redShades",
    backgroundColor: "#e0e0e0",
    width:200,
    height:200,
    data: [{
      type: "pie",
      startAngle: 0,
      indexLabel: "{name}",
      indexLabelPlacement: "inside",
      indexLabelFontSize: 16,
      dataPoints:PieChartData
    }]
  };

  const Line_Chart = {
    animationEnabled: true,
    interactivityEnabled: true,
    highlightEnabled: true,
    explodeOnClick: true,
    backgroundColor: "#e0e0e0",
    width:400,
    height:200,
    data: [{
      type: "line",
      lineColor: "red",
      indexLabelFontSize: 16,
      dataPoints: [
        { x: new Date(2012, 0, 1), y: 450 },
        { x: new Date(2012, 1, 1), y: 414 },
        { x: new Date(2012, 2, 1), y: 520 },
        { x: new Date(2012, 3, 1), y: 460 },
        { x: new Date(2012, 4, 1), y: 450 },
        { x: new Date(2012, 5, 1), y: 500 },
        { x: new Date(2012, 6, 1), y: 480 },
        { x: new Date(2012, 7, 1), y: 480 },
        { x: new Date(2012, 8, 1), y: 410 },
        { x: new Date(2012, 9, 1), y: 500 },
        { x: new Date(2012, 10, 1), y: 480 },
        { x: new Date(2012, 11, 1), y: 510 }
      ]
    }]
  };

  const optionss = {
    //exportEnabled: true,
    animationEnabled: true,
    interactivityEnabled: true,
    colorSet:"redShades",
    // title: {
    //   text: "歷史紀錄~"
    // },

    data: [{
      type: "pie",
      startAngle: 150,
      indexLabel: "{2023}",
      indexLabelPlacement: "inside",
      indexLabelFontSize: 16,
      width: 30 ,
      dataPoints:RightChartData //json
    }]
  };

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
          {favorite
            ? <FavoriteIcon className="star-icon" onClick={() => setFavorite(false)} />
            : <NotFavoriteIcon className="star-icon" onClick={() => setFavorite(true)} />}
          <h3>{currentEvent ? currentEvent.name : "載入中..."}</h3>
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
          <div className="ai-signal-info-right">
            <div className="container">
              <p>AI訊號推薦</p>
              <CanvasJSChart className="chart" options = {options}/>
              <p>商品訊號</p>
              <p>過去5年內當 高鐵 發生hike訊號時，在4天後 飯店 也會發生hike訊號，並延續56天。</p>
              <CanvasJSChart className="chart" options = {Line_Chart}/>
              <p>新聞熱搜關鍵字</p>
              <p>新聞連結</p>
            </div>
          </div>
        </div>
      </div>
      <div className="activity-info-section-right">
        <div className="related-events">
          <h3>相似活動</h3>
          {relatedEvents?.map((event) => {
            return (
              <button
                key={event.id}
                className="related-event-badge"
                onClick={() => setEventId(event.id)}
              >
                {event.name}
              </button>
            );
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
            <h3>歷史紀錄</h3>
            <div className="right_pie">
              <CanvasJSChartRight options = {optionss}/>
            </div>
          </div >
        </div>
      </div>
    </section>
  );
}
