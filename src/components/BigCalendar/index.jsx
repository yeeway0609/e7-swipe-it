import "./style.sass";
import React, { useState, useRef, useEffect, useContext } from "react";
import { EventIdContext } from "@/context/EventIdContext";
import { EventFilterContext } from "@/context/EventFilterContext";
import { SelectedDateContext } from "@/context/SelectedDateContext";
import { CalendarTabContext } from "@/context/CalendarTabContext";

export default function BigCalendar() {
  const [eventsData, setEventsData] = useState(null);
  const { selectedDate } = useContext(SelectedDateContext);
  const { eventId, setEventId } = useContext(EventIdContext);
  const { eventFilter } = useContext(EventFilterContext);
  const { calendarTab, setCalendarTab } = useContext(CalendarTabContext);

  const filteredEvents = eventsData?.filter(event => {
    const nameMatch = eventFilter.name === "" || event.name.toLowerCase().includes(eventFilter.name.toLowerCase());
    const locationMatch = eventFilter.location === "" || eventFilter.location === event.location;
    const typeMatch = eventFilter.type.length === 0 || eventFilter.type.includes(event.type);

    return nameMatch && locationMatch && typeMatch;
  });

  const eventColor = {
    "音樂祭": "#F9A060",
    "演唱會(大型)": "#F9A060",
    "演唱會(小型)": "#F9A060",
    "藝文表演": "#3D8B00",
    "藝文展覽": "#3D8B00",
    "工商展覽(B2B)": "#0011A4",
    "工商展覽(B2C)": "#0011A4",
  };

  const favoriteEvents = [
    {
      name: "大港開唱",
      location: "高雄",
      date: "2024/06/20-2024/06/21",
      type: "音樂祭",
      bgColor: `bg-[#F9A060]`
    },
    {
      name: "台灣祭",
      location: "屏東",
      date: "2024/06/20-2024/06/21",
      type: "音樂祭",
      bgColor: `bg-[#F9A060]`
    },
    {
      name: "黃色小鴨",
      location: "高雄",
      date: "2024/06/20-2024/06/21",
      type: "音樂祭",
      bgColor: `bg-[#3D8B00]`
    },
    {
      name: "草草戲劇節",
      location: "嘉義",
      date: "2024/06/20-2024/06/21",
      type: "音樂祭",
      bgColor: `bg-[#3D8B00]`
    },
    {
      name: "電腦展",
      location: "台北",
      date: "2024/06/20-2024/06/21",
      type: "音樂祭",
      bgColor: `bg-[#4F5CD0]`
    },
    {
      name: "半導體展",
      location: "台北",
      date: "2024/06/20-2024/06/21",
      type: "音樂祭",
      bgColor: `bg-[#4F5CD0]`
    }
  ];

  async function fetchEvents() {
    try {
      const response = await fetch('http://luffy.ee.ncku.edu.tw:4445/events');
      const data = await response.json();
      setEventsData(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const currentDayRef = useRef(null);
  const parentRef = useRef(null);

  // 在組件初次渲染時滾動到當天日期的元素
  useEffect(() => {
    currentDayRef.current?.scrollIntoView({
      behavior: "instant",
      inline: "center"
    });
  }, []);

  // 在 selectedDate context 變化時滾動到新的日期
  useEffect(() => {
    if (!selectedDate) return;

    const targetDay = days.find(day => day.formatDate === formatDates(selectedDate));

    if (targetDay && parentRef.current) {
      const targetElement = document.getElementById(targetDay.formatDate);

      if (targetElement) {
        const parentElement = parentRef.current;
        const targetOffsetLeft = targetElement.offsetLeft;
        const parentWidth = parentElement.offsetWidth;
        const targetWidth = targetElement.offsetWidth;

        // 計算新的 scrollLeft 位置，確保目標元素居中
        const newScrollLeft = targetOffsetLeft - (parentWidth / 2) + (targetWidth / 2);

        // 使用 scrollLeft 屬性來滾動
        parentElement.scrollTo({
          left: newScrollLeft,
          behavior: "smooth"
        });
      }
    }
  }, [selectedDate]);

  // 格式化日期的函式，將 Date 轉換成 yyyy-mm-dd 格式的字串
  function formatDates(d) {
    const year = d.getFullYear();
    const month = (d.getMonth() < 9) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
    const day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
    return `${year}-${month}-${day}`;
  }

  // 使用 useState 來儲存整個日曆的起始結束範圍
  const firstDay = "2024-01-01";
  const lastDay = "2024-12-31";
  const [dateRange] = useState([firstDay, lastDay]);

  // 生成指定日期範圍內每天的資訊陣列
  function weekDays(loopDate, loopEndDate) {
    const today = formatDates(new Date());
    const newWeekDays = [];

    while (loopDate <= loopEndDate) {
      newWeekDays.push({
        date: new Date(loopDate), // 創建未格式化的日期物件
        dayNo: loopDate.getDate(), // 獲取日期中的日
        dayName: loopDate.toLocaleString("default", { weekday: "long" }), // 獲取星期幾的名稱
        formatDate: formatDates(loopDate), // 格式化日期為 yyyy-mm-dd 格式的字串
        isToday: formatDates(loopDate) === today, // 獲取星期幾的名稱
        isCurrentMonth: new Date(loopDate).getMonth() === new Date().getMonth() // 判斷是否為當前月份
      });

      const newDate = loopDate.setDate(loopDate.getDate() + 1); // 取得下一天的日期
      loopDate = new Date(newDate); // 將 loopDate 更新為下一天的日期物件
    }
    return newWeekDays;
  }

  const days = weekDays(new Date(dateRange[0]), new Date(dateRange[1]));

  return (
    <div id="calendar">
      <ul className="tab-bar">
        <li onClick={() => setCalendarTab(1)} className={calendarTab == 1 ? "active" : ""}>
          週曆
        </li>
        <li onClick={() => setCalendarTab(2)} className={calendarTab == 2 ? "active" : ""}>
          所有活動
        </li>
        <li onClick={() => setCalendarTab(3)} className={calendarTab == 3 ? "active" : ""}>
          收藏
        </li>
      </ul>
      {(() => {
        if (calendarTab == 1) {
          return (
            <div id="week-view-wrapper" className="view-wrapper" ref={parentRef}>
              <div id="day-heading">
                {days.map((day, index) => {
                  return (
                    <div
                      key={index + "_" + day.dayNo}
                      id={day.formatDate}
                      ref={day.isToday ? currentDayRef : null}
                      className={
                        "day " +
                        day.dayName +
                        `${day.isToday === true ? " isToday" : ""}` +
                        `${day.isCurrentMonth ? " currentMonth" : " notCurrentMonth"}`
                      }
                    >
                      <p>{day.dayName.substring(0, 3)}</p>
                      <div className="date-col">
                        <p>{day.formatDate.substring(5)}</p>
                        <span></span>
                        <div className="event-area">
                          {filteredEvents?.map((event) => {
                            const startDate = new Date(event.start_date); // Tue Apr 09 2024 00:00:00 GMT+0800 (Taipei Standard Time)
                            const endDate = new Date(event.end_date);
                            if (formatDates(startDate) == day.formatDate) {
                              const durationDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                              const width = durationDays * 102;
                              return (
                                <div
                                  key={event.id}
                                  className="event"
                                  onClick={() => setEventId(event.id)}
                                  style={{
                                    width: `${width}%`,
                                    backgroundColor: eventColor[event.type],
                                    border: (event.id === eventId) ? "3px solid black" : "none"
                                  }}
                                >
                                  {event.name}
                                </div>
                              );
                            } else {
                              return <div key={event.id} className="no-event"></div>;
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        } else if (calendarTab === 2) {
          return (
            <div className="view-wrapper p-5">
              {eventFilter?.type.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center text-[#a7a7a7] text-3xl font-bold">
                  請勾選活動類型
                </div>
              ) : (
                eventFilter?.type.map((eventFilterType) => {
                  return (
                    <>
                      <h3 key="" className="w-full mt-4 mb-2 border-b-2 border-b-[#F9A060]">
                        <span className="bg-[#FCBD8F] px-2 py-1 rounded-t-md">{eventFilterType}</span>
                      </h3>
                      <div className="w-full flex border-b border-[#D9D9D9]">
                        <div className="w-3/12 text-left text-Red">活動時間</div>
                        <div className="w-3/12 text-left text-Red">活動名稱</div>
                        <div className="w-4/12 text-left text-Red">商機熱度</div>
                        <div className="w-2/12 text-left text-Red">活動地點</div>
                      </div>
                      {filteredEvents
                        .filter(event => event.type === eventFilterType)
                        .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
                        .map((event) => {
                          const progress = (Math.floor(Math.random() * 100) + 50).toFixed(0);

                          return (
                            <div className="flex w-full items-center border-b border-[#D9D9D9] h-8" key={event.id}>
                              <div className="w-3/12 font-semibold">
                                <span>{event.start_date.substring(5, 7)}/{event.start_date.substring(8, 10)} - {event.end_date.substring(5, 7)}/{event.end_date.substring(8, 10)}</span>
                              </div>
                              <div className="w-3/12 cursor-pointer" onClick={() => setEventId(event.id)}>
                                <span>{event.name}</span>
                              </div>
                              <div className="w-4/12">
                                <div className="w-[150px] h-[10px] rounded-[10px] bg-[#FFE1CC]">
                                  <div className={`h-full rounded-[10px] bg-[#F8AA73]`} style={{width: `${progress}px`}}></div>
                                </div>
                              </div>
                              <div className="w-2/12">{event.location}</div>
                            </div>
                          );
                        })}
                    </>
                  );
                })
              )}
            </div>
          );
        } else {
          return (
            <div className="view-wrapper p-5">
              <div className="flex flex-wrap gap-5">
                {favoriteEvents.map((event, idx) => {
                  return (
                    <div key={idx} className={`w-[240px] h-[114px] pt-2 pl-2 ${event.bgColor} rounded-lg`}>
                      <div className="flex justify-between pr-2 text-[#ffffff]">
                        <span>{event.name}</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="text-sm mb-1 text-[#ffffff]">{event.date}</div>
                      <textarea className="w-[232px] p-1 rounded-lg border-[1px] border-[#787878] resize-none" placeholder="note:"></textarea>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
}
