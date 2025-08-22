
import React, { useState } from 'react';
import './App.css';


import Navbar from './Components/Navbar/Navbar';
import Timers from './Components/Timers/Timers';
import Alarms from './Components/Alarms/Alarms';
import Stopwatch from './Components/Stopwatch/Stopwatch';

function App() {
  const [selected, setSelected] = useState('Stopwatch');

  let content = null;
  if (selected === 'Timers') content = <Timers />;
  else if (selected === 'Alarms') content = <Alarms />;
  else if (selected === 'Stopwatch') content = <Stopwatch />;

  return (
    <div className="app">
      <Navbar selected={selected} onSelect={setSelected} />
      {content}
    </div>
  );
}

export default App;
