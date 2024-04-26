import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', overflowX: 'scroll' }}>
      <button onClick={decrement} style={{ marginRight: '10px' }}>{"<"}</button>
      <div style={{ flex: 1 }}>
        <p>Count: {count}</p>
      </div>
      <button onClick={increment} style={{ marginLeft: '10px' }}>{">"}</button>
    </div>
  );
}

export default Counter;
