import React, { useState, createContext } from "react";

export const EventIdContext = createContext();

export const EventIdProvider = ({ children }) => {
  const [eventId, setEventId] = useState(100);

  return (
    <EventIdContext.Provider value={{ eventId, setEventId }}>
      {children}
    </EventIdContext.Provider>
  );
};
