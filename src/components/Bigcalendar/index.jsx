// To do: 目前必須要先滾動到最兩側才能夠增加日期，但是就要在點擊小月曆前先滾動兩側才能換日期

import "./style.sass";
import React, { useState, useRef, useEffect, useContext } from "react";
import { SelectedDateContext } from "@/context/SelectedDateContext";

export default function BigCalendar() {
  const { selectedDate } = useContext(SelectedDateContext);

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
        console.log(targetElement);
        targetElement.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }
    }
  }, [selectedDate]);

  // 格式化日期的函式，將 Date 物件轉換成 yyyy-mm-dd 格式的日期字串
  function formatDates(inputDate) {
    let month =
      +inputDate.getMonth() + 1 < 10
        ? "0" + (+inputDate.getMonth() + 1)
        : +inputDate.getMonth() + 1;
    let date =
      +inputDate.getDate() < 10
        ? "0" + inputDate.getDate()
        : inputDate.getDate();
    return inputDate.getFullYear() + "/" + month + "/" + date;
  }

  // 計算兩個日期之間的天數
  function getNoOfDays(start, last) {
    // gives no. of days
    if (!start || !last) return;
    const date1 = new Date(start);
    const date2 = new Date(last);

    const oneDay = 1000 * 60 * 60 * 24;

    const diffTime = date2.getTime() - date1.getTime();

    const diffDays = Math.round(diffTime / oneDay) + 1;
    if (diffDays >= 0) return diffDays;
  }

  const currentDayRef = useRef(null);
  const parentRef = useRef(null);

  // 獲取當前年月的第一天和最後一天的日期字串
  let date = new Date(), y = date.getFullYear(), m = date.getMonth();
  let firstDay = formatDates(new Date(y, m, 1));
  let lastDay = formatDates(new Date(y, m + 1, 0));

  // 生成指定日期範圍內每天的資訊陣列
  function weekDays(loopDate, loopEndDate) {
    const today = formatDates(new Date());
    let newWeekDays = [];

    while (loopDate <= loopEndDate) {
      newWeekDays.push({
        date: new Date(loopDate), // 創建未格式化的日期物件
        dayNo: loopDate.getDate(), // 獲取日期中的日
        dayName: loopDate.toLocaleString("default", { weekday: "long" }), // 獲取星期幾的名稱
        formatDate: formatDates(loopDate), // 格式化日期為 yyyy-mm-dd 格式的字串
        isToday: formatDates(loopDate) === today, // 獲取星期幾的名稱
        isCurrentMonth: new Date(loopDate).getMonth() === new Date().getMonth() // 判斷是否為當前月份
      });

      let newDate = loopDate.setDate(loopDate.getDate() + 1); // 取得下一天的日期
      loopDate = new Date(newDate); // 將 loopDate 更新為下一天的日期物件
    }
    return newWeekDays; // 返回包含日期資訊的陣列
  }

  // 使用 useState 來儲存日期範圍狀態
  const [dateRange, setDateRange] = useState([firstDay, lastDay]);

  // 生成指定日期範圍內的每天資訊
  let days = weekDays(new Date(dateRange[0]), new Date(dateRange[1]));

  // 處理水平滾動事件的函式
  const handleHorizontalScroll = () => {
    let e = document.getElementById("week-view-wrapper");
    let dayWidth = ((window.innerWidth - 10) / 7 + 1).toFixed(2); // 計算每天的 div 寬度

    // 如果滾動到最右側，則增加後一個月的日期範圍
    if (Math.ceil(e.scrollLeft) + e.clientWidth >= e.scrollWidth) {
      let date = new Date(dateRange[1]);
      let y = date.getFullYear();
      let m = date.getMonth();
      let lastDay = formatDates(new Date(y, m + 2, 0), "yyyy-mm-dd");

      setDateRange([dateRange[0], lastDay]); // 更新日期範圍
    } else if (e.scrollLeft <= 0) {
      // 如果滾動到最左側，則增加前一個月的日期範圍
      let date = new Date(dateRange[0]);
      date.setMonth(date.getMonth() - 1);
      let y = date.getFullYear();
      let m = date.getMonth();
      let firstDay = formatDates(new Date(y, m, 1), "yyyy-mm-dd");
      let lastDay = formatDates(new Date(y, m + 1, 0), "yyyy-mm-dd");
      let scrollValue = dayWidth * getNoOfDays(firstDay, lastDay);

      setDateRange([firstDay, dateRange[1]]); // 更新日期範圍

      setTimeout(() => {
        e.scrollTo(scrollValue, 0); // 滾動到新的日期範圍
      }, 0);
    }
  };

  return (
    <div
      className="leave-calendar-content slide"
      id="week-view-wrapper"
      ref={parentRef}
      onScroll={handleHorizontalScroll}
    >
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
              <div className="event-area">
                <p>{day.formatDate.substring(5)}</p>
                <span></span>
                <div></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
