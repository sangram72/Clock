
import React, { useState } from 'react';
import './App.css';


import Navbar from './components/Navbar/Navbar';
import Timers from './components/Timers/Timers';
import Alarms from './components/Alarms/Alarms';
import Stopwatch from './components/Stopwatch/Stopwatch';

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
