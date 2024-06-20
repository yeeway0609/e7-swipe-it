import React, { useState, createContext } from "react";

export const EventFilterContext = createContext();

export const EventFilterProvider = ({ children }) => {
  const [eventFilter, setEventFilter] = useState({
    name: "",
    type: [],
    location: "",
  });

  return (
    <EventFilterContext.Provider value={{ eventFilter, setEventFilter }}>
      {children}
    </EventFilterContext.Provider>
  );
};
