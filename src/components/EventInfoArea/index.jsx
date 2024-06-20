import "./style.sass";
import { React, useState, useContext, useEffect } from "react";
import { EventIdContext } from "@/context/EventIdContext";
import { StarIcon as NotFavoriteIcon } from "@heroicons/react/24/outline";
import { StarIcon as FavoriteIcon } from "@heroicons/react/24/solid";
import CanvasJSReact from "@canvasjs/react-charts";
import PieChartData from "@/data/PieChartData.json";
import RightChartData from "@/data/RightChartData.json";

// G1
import member1_1 from "@/img/line_chart/G1/1-left.png";
import member1_2 from "@/img/line_chart/G1/1-up.png";
import member1_3 from "@/img/line_chart/G1/1-down.png";

// G2
import member2_1 from "@/img/line_chart/G2/2-left.png";
import member2_2 from "@/img/line_chart/G2/2-up.png";
import member2_3 from "@/img/line_chart/G2/2-down.png";

// G3
import member3_1 from "@/img/line_chart/G3/3-left.png";
import member3_2 from "@/img/line_chart/G3/3-up.png";
import member3_3 from "@/img/line_chart/G3/3-down.png";

// G4
import member4_1 from "@/img/line_chart/G4/4-left.png";
import member4_2 from "@/img/line_chart/G4/4-up.png";
import member4_3 from "@/img/line_chart/G4/4-down.png";

// G5
import member5_1 from "@/img/line_chart/G5/5-left.png";
import member5_2 from "@/img/line_chart/G5/5-up.png";
import member5_3 from "@/img/line_chart/G5/5-down.png";

// G6
import member6_1 from "@/img/line_chart/G6/6-left.png";
import member6_2 from "@/img/line_chart/G6/6-up.png";
import member6_3 from "@/img/line_chart/G6/6-down.png";

// G7
import member7_1 from "@/img/line_chart/G7/7-left.png";
import member7_2 from "@/img/line_chart/G7/7-up.png";
import member7_3 from "@/img/line_chart/G7/7-down.png";

// G8
import member8_1 from "@/img/line_chart/G8/8-left.png";
import member8_2 from "@/img/line_chart/G8/8-up.png";
import member8_3 from "@/img/line_chart/G8/8-down.png";

// G9
import member9_1 from "@/img/line_chart/G9/9-left.png";
import member9_2 from "@/img/line_chart/G9/9-up.png";
import member9_3 from "@/img/line_chart/G9/9-down.png";

// G10
import member10_1 from "@/img/line_chart/G10/10-left.png";
import member10_2 from "@/img/line_chart/G10/10-up.png";
import member10_3 from "@/img/line_chart/G10/10-down.png";

// G11
import member11_1 from "@/img/line_chart/G11/11-left.png";
import member11_2 from "@/img/line_chart/G11/11-up.png";
import member11_3 from "@/img/line_chart/G11/11-down.png";

// G12
import member12_1 from "@/img/line_chart/G12/12-left.png";
import member12_2 from "@/img/line_chart/G12/12-up.png";
import member12_3 from "@/img/line_chart/G12/12-down.png";

// G13
import member13_1 from "@/img/line_chart/G13/13-left.png";
import member13_2 from "@/img/line_chart/G13/13-up.png";
import member13_3 from "@/img/line_chart/G13/13-down.png";

// G14
import member14_1 from "@/img/line_chart/G14/14-left.png";
import member14_2 from "@/img/line_chart/G14/14-up.png";
import member14_3 from "@/img/line_chart/G14/14-down.png";

// G15
import member15_1 from "@/img/line_chart/G15/15-left.png";
import member15_2 from "@/img/line_chart/G15/15-up.png";
import member15_3 from "@/img/line_chart/G15/15-down.png";

// G16
import member16_1 from "@/img/line_chart/G16/16-left.png";
import member16_2 from "@/img/line_chart/G16/16-up.png";
import member16_3 from "@/img/line_chart/G16/16-down.png";


export default function EventInfoArea() {
  const {eventId, setEventId} = useContext(EventIdContext);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState(null);
  const [selectedSignalProductIndex, setSelectedSignalProductIndex] = useState(0);

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
    if (data) {
      data.top5_products = JSON.parse(data.top5_products); // 解析 top5_products
      data.news_trend = JSON.parse(data.news_trend); // 解析 news_trend
    }
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
  const historyTab = ["2023", "2022", "2021", "2020"];
  const [historyTabActive, setHistoryTabActive] = useState("2023");
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  var CanvasJSChartRight = CanvasJSReact.CanvasJSChart;
  const left_pie_options = {
    animationEnabled: true,
    interactivityEnabled: true,
    highlightEnabled: true,
    explodeOnClick: true,
    colorSet: "redShades",
    backgroundColor: "#ffffff",
    width: 250,
    height: 250,
    data: [{
      type: "pie",
      startAngle: 0,
      indexLabel: "{name}",
      indexLabelPlacement: "inside",
      indexLabelFontSize: 16,
      indexLabelFontColor: "#ffffff",
      dataPoints: getLeftPieData(aiTabActive, eventId)
    }]
  };

  function getLeftPieData(tab, eventId) {
    let eventIdInt = parseInt(eventId);
    let remainder = eventIdInt % 4;
    console.log("eventId:", eventId, "remainder:", remainder);

    switch (remainder) {
      case 0:
        switch (tab) {
          case "交通":
            return PieChartData.id1.transportation ;
          case "住宿":
            return PieChartData.id1.accommodation ;
          case "票券":
            return PieChartData.id1.tickets ;
          case "飲食":
            return PieChartData.id1.dining ;
          default:
            return [];
        }
      case 1:
        switch (tab) {
          case "交通":
            return PieChartData.id2.transportation ;
          case "住宿":
            return PieChartData.id2.accommodation ;
          case "票券":
            return PieChartData.id2.tickets ;
          case "飲食":
            return PieChartData.id2.dining ;
          default:
            return [];
        }
      case 2:
        switch (tab) {
          case "交通":
            return PieChartData.id3.transportation ;
          case "住宿":
            return PieChartData.id3.accommodation ;
          case "票券":
            return PieChartData.id3.tickets ;
          case "飲食":
            return PieChartData.id3.dining ;
          default:
            return [];
        }
      case 3:
        switch (tab) {
          case "交通":
            return PieChartData.id4.transportation ;
          case "住宿":
            return PieChartData.id4.accommodation ;
          case "票券":
            return PieChartData.id4.tickets ;
          case "飲食":
            return PieChartData.id4.dining ;
          default:
            return [];
        }
      default:
        return [];
    }
  }


  const right_pie_options = {
    animationEnabled: true,
    interactivityEnabled: true,
    colorSet: "redShades",
    width: 250,
    height: 250,
    data: [{
      type: "pie",
      startAngle: 150,
      indexLabel: "{name}",
      indexLabelPlacement: "inside",
      indexLabelFontSize: 16,
      indexLabelFontColor: "#ffffff",
      dataPoints: getRightPieData(aiTabActive, historyTabActive)
    }]
  };

  function getRightPieData(tab, historyTabActive) {
    switch (historyTabActive) {
      case "2020":
        switch (tab) {
          case "交通":
            return RightChartData.year2020.transportation.map(item => ({ name: item.name, y: item.y }));
          case "住宿":
            return RightChartData.year2020.accommodation.map(item => ({ name: item.name, y: item.y }));
          case "票券":
            return RightChartData.year2020.tickets.map(item => ({ name: item.name, y: item.y }));
          case "飲食":
            return RightChartData.year2020.dining.map(item => ({ name: item.name, y: item.y }));
          default:
            return [];
        }
      case "2021":
        switch (tab) {
          case "交通":
            return RightChartData.year2021.transportation.map(item => ({ name: item.name, y: item.y }));
          case "住宿":
            return RightChartData.year2021.accommodation.map(item => ({ name: item.name, y: item.y }));
          case "票券":
            return RightChartData.year2021.tickets.map(item => ({ name: item.name, y: item.y }));
          case "飲食":
            return RightChartData.year2021.dining.map(item => ({ name: item.name, y: item.y }));
          default:
            return [];
        }
      case "2022":
        switch (tab) {
          case "交通":
            return RightChartData.year2022.transportation.map(item => ({ name: item.name, y: item.y }));
          case "住宿":
            return RightChartData.year2022.accommodation.map(item => ({ name: item.name, y: item.y }));
          case "票券":
            return RightChartData.year2022.tickets.map(item => ({ name: item.name, y: item.y }));
          case "飲食":
            return RightChartData.year2022.dining.map(item => ({ name: item.name, y: item.y }));
          default:
            return [];
        }
      case "2023":
        switch (tab) {
          case "交通":
            return RightChartData.year2023.transportation.map(item => ({ name: item.name, y: item.y }));
          case "住宿":
            return RightChartData.year2023.accommodation.map(item => ({ name: item.name, y: item.y }));
          case "票券":
            return RightChartData.year2023.tickets.map(item => ({ name: item.name, y: item.y }));
          case "飲食":
            return RightChartData.year2023.dining.map(item => ({ name: item.name, y: item.y }));
          default:
            return [];
        }
      default:
        return [];
    }
  }


  CanvasJS.addColorSet("redShades",
    [//colorSet Array
      "rgba(201, 2, 15, 1)", // Red
      "rgba(201, 2, 15, 0.85)", // Tomato
      "rgba(201, 2, 15, 0.6)", // OrangeRed
      "rgba(201, 2, 15, 0.5)", // Crimson
      "rgba(201, 2, 15, 0.4)", // FireBrick
      "rgba(201, 2, 15, 0.3)", // DarkRed
    ]);

  function handleProductClick(productIndex) {
    setSelectedProductIndex(productIndex === selectedProductIndex ? null : productIndex);
  }

  function handleSignalProductClick(productIndex) {
    setSelectedSignalProductIndex(productIndex === selectedSignalProductIndex ? null : productIndex);
  }


  function getImageByYearAndLine(year, position) {
    if (!currentEvent) {
      return null;
    }

    const lineMap = {
      "2023": currentEvent.line_2023,
      "2022": currentEvent.line_2022,
      "2021": currentEvent.line_2021,
      "2020": currentEvent.line_2020,
    };

    const images = {
      0: { left: member1_1, up: member1_2, down: member1_3 },
      1: { left: member2_1, up: member2_2, down: member2_3 },
      2: { left: member3_1, up: member3_2, down: member3_3 },
      3: { left: member4_1, up: member4_2, down: member4_3 },
      4: { left: member5_1, up: member5_2, down: member5_3 },
      5: { left: member6_1, up: member6_2, down: member6_3 },
      6: { left: member7_1, up: member7_2, down: member7_3 },
      7: { left: member8_1, up: member8_2, down: member8_3 },
      8: { left: member9_1, up: member9_2, down: member9_3 },
      9: { left: member10_1, up: member10_2, down: member10_3 },
      10: { left: member11_1, up: member11_2, down: member11_3 },
      11: { left: member12_1, up: member12_2, down: member12_3 },
      12: { left: member13_1, up: member13_2, down: member13_3 },
      13: { left: member14_1, up: member14_2, down: member14_3 },
      14: { left: member15_1, up: member15_2, down: member15_3 },
      15: { left: member16_1, up: member16_2, down: member16_3 },
    };

    const line = lineMap[year];
    return line !== undefined && images[line] ? images[line][position] : null;
  }


  return (
    <div className="activity-info-section">
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
          <div className="ai-signal-info-left">
            <div className="AI-top">
              <div className="AI-recommend">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;AI訊號推薦</h3>
                <div className="left-pie-chart">
                  <CanvasJSChart options={left_pie_options} />
                </div>
              </div>
              <div className="product-signal">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <h3>商品訊號</h3>
                <div className="top5-products" style={{ display: "flex", alignItems: "center"}}>
                  {currentEvent?.top5_products?.slice(0, 3).map((product, index) => (
                    <div
                      key={index}
                      className="product-box2"
                      style={{
                        backgroundColor: selectedSignalProductIndex === index ? "#C9020F" : "#f0f0f0",
                        color: selectedSignalProductIndex === index ? "#ffffff" : "#000000",
                        cursor: "pointer"
                      }}
                      onClick={() => handleSignalProductClick(index)}
                    >
                      <p>{product}</p>
                    </div>
                  ))}
                </div>
                <div className="product-signal-analysis"style={{ backgroundColor: "#f0f0f0", width: "300px", height: "150px", padding: "10px", borderRadius: "5px" }}>
                  <p>過去5年內當 高鐵 發生hike訊號時，在4天後 {currentEvent?.top5_products[selectedSignalProductIndex]} 也會發生hike訊號，並延續56天。<br></br><br></br>信心程度:75%</p>
                </div>
              </div>
            </div>
            <div className="AI-down mt-8 flex items-center gap-2">
              <h3 className="ml-3 [writing-mode:vertical-lr]">刷卡總額</h3>
              <div className="text-sm mt-1 flex flex-col gap-[6px]">
                <div>5648</div>
                <div>5647</div>
                <div>5646</div>
                <div>5645</div>
                <div>5644</div>
              </div>
              <div className="left-image relative">
                <h3 className="absolute font-bold" style={{ color: "#C9020F" }}>高鐵</h3>
                <img src={getImageByYearAndLine(historyTabActive,"left")}  />
                <div className="flex gap-[34px]">
                  <span>01</span>
                  <span>02</span>
                  <span>03</span>
                  <span>04</span>
                  <span>05</span>
                  <span>06</span>
                  <span>07</span>
                  <span>08</span>
                  <span>09</span>
                  <span>10</span>
                  <span>11</span>
                  <span>12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="news-signal">
          <h3 className="mt-2">新聞熱搜關鍵字</h3>
          <div className="relative h-20 mt-5 ml-20 mb-20">
            <span className="absolute left-[10px] top-[10px] text-lg">草東沒有派對</span>
            <span className="absolute left-[120px] top-[35px] text-xl">台灣祭</span>
            <span className="absolute left-[130px] top-[0px] text-sm">酒吧</span>
            <span className="absolute left-[50px] top-[55px] text-xl">唱歌</span>
            <span className="absolute left-[10px] top-[90px] text-xl">滿島光</span>
            <span className="absolute left-[100px] top-[80px] text-base">熟食</span>
            <span className="absolute left-[150px] top-[75px] text-base">飲品</span>
            <span className="absolute left-[220px] top-[60px] text-xl">毛巾</span>
            <span className="absolute left-[220px] top-[35px] text-sm">啤酒</span>
            <span className="absolute left-[200px] top-[5px] text-xl">週邊商品</span>
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
            <div className="history-records-info-top">
              <div className="history-records-pie">
                <h3>歷史紀錄</h3>
                <div className="right_pie">
                  <CanvasJSChartRight options={right_pie_options} />
                </div>
              </div>
              <div className="history-records-top5">
                <h3>前五名相關商品</h3>
                <div className="top5-products" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                  {currentEvent?.top5_products?.map((product, index) => (
                    <div
                      key={index}
                      className="product-box"
                      style={{
                        backgroundColor: selectedProductIndex === index ? "#C9020F" : "#f0f0f0",
                        color: selectedProductIndex === index ? "#ffffff" : "#000000",
                        cursor: "pointer"
                      }}
                      onClick={() => handleProductClick(index)}
                    >
                      <p>{product}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="history-records-info-down">
              <div className="up-text-image mt-8 flex items-center gap-2">
                <h3 className="[writing-mode:vertical-lr]">刷卡總額</h3>
                <div className="text-sm flex flex-col gap-[1px]">
                  <div>5648</div>
                  <div>5647</div>
                  <div>5646</div>
                  <div>5645</div>
                  <div>5644</div>
                </div>
                <div className="up-image relative mt-4">
                  <h3 className="absolute font-bold" style={{ color: "#C9020F" }}>高鐵</h3>
                  <img src={getImageByYearAndLine(historyTabActive,"up")}  />
                  <div className="flex gap-[22px]">
                    <span>01</span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                    <span>05</span>
                    <span>06</span>
                    <span>07</span>
                    <span>08</span>
                    <span>09</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                  </div>
                </div>
              </div>
              <div className="down-text-image flex items-center gap-2">
                <h3 className="[writing-mode:vertical-lr]">刷卡總額</h3>
                <div className="text-sm flex flex-col gap-[1px]">
                  <div>5648</div>
                  <div>5647</div>
                  <div>5646</div>
                  <div>5645</div>
                  <div>5644</div>
                </div>
                <div className="down-image relative mt-4">
                  <h3 className="absolute font-bold" style={{ color: "#C9020F" }}>{currentEvent?.top5_products[selectedProductIndex]}</h3>
                  <img src={getImageByYearAndLine(historyTabActive,"down")}  />
                  <div className="flex gap-[22px]">
                    <span>01</span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                    <span>05</span>
                    <span>06</span>
                    <span>07</span>
                    <span>08</span>
                    <span>09</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
