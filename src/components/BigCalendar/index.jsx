import "./style.sass";
import React, { useState, useRef, useEffect, useContext } from "react";
import { EventIdContext } from "@/context/EventIdContext";
import { SelectedDateContext } from "@/context/SelectedDateContext";

export default function BigCalendar() {
  const [eventsData, setEventsData] = useState(null);

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

  const { selectedDate } = useContext(SelectedDateContext);
  const { eventId, setEventId } = useContext(EventIdContext);

  const eventColor = {
    "音樂祭": "#F9A060",
    "演唱會(大型)": "#F9A060",
    "演唱會(小型)": "#F9A060",
    "藝文表演": "#3D8B00",
    "藝文展覽": "#3D8B00",
    "工商展覽(B2B)": "#0011A4",
    "工商展覽(B2C)": "#0011A4",
  };

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
        // console.log(targetElement);
        targetElement.scrollIntoView({
          behavior: "instant",
          inline: "center",
          block: "nearest"
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
    <div id="week-view-wrapper" ref={parentRef}>
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
                  {eventsData?.map((event) => {
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
}
