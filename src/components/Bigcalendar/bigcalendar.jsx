import React, { useState } from 'react';
import './bigcalendar.css';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function App() {
  const [startDay, setStartDay] = useState(0);

  const handleLeftClick = () => {
    setStartDay((startDay - 1 + 7) % 7);
  };

  const handleRightClick = () => {
    setStartDay((startDay + 1) % 7);
  };

  return (
    <div className="App">
      <button onClick={handleLeftClick}>Left</button>
      <div className="week">
        {days.slice(startDay, startDay + 7).map((day, index) => (
          <div key={index} className="day">
            {day}
          </div>
        ))}
      </div>
      <button onClick={handleRightClick}>Right</button>
    </div>
  );
}

export default App;
