import React, { useState, createContext } from "react";

export const CalendarTabContext = createContext();

export const CalendarTabProvider = ({ children }) => {
  const [calendarTab, setCalendarTab] = useState(1);

  return (
    <CalendarTabContext.Provider value={{ calendarTab, setCalendarTab }}>
      {children}
    </CalendarTabContext.Provider>
  );
};
