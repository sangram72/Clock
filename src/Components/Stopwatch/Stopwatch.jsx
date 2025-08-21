import React, { useState, useRef } from 'react';
import './Stopwatch.css';
import { useAudioPlayer } from 'react-use-audio-player';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const { load } = useAudioPlayer();

  function start() {
    if (isRunning) return;
    setIsRunning(true);

    // Play audio on start
    load('/audio/timers.mp3', {
      initialVolume: 0.75,
      autoplay: true,
    });

    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  }

  function pause() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  }

  function reset() {
    pause();
    setTime(0);
    setLaps([]);
  }

  function lap() {
    if (!isRunning) return;
    setLaps(prev => [...prev, time]);
  }

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-box">
        <h2>Stopwatch</h2>

        <div className="stopwatch-time">{formatTime(time)}</div>

        <div className="stopwatch-buttons">
          <button onClick={!isRunning ? start : pause} className="btn start">
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button onClick={isRunning ? lap : reset} className="btn reset">
            {isRunning ? 'Lap' : 'Reset'}
          </button>
        </div>

        {laps.length > 0 && (
          <ul className="lap-list">
            {laps.map((lapTime, index) => (
              <li key={index} className="lap-item">
                <span>Lap {index + 1}:</span>
                <span>{formatTime(lapTime)}</span>
              </li>
            ))}
          </ul>
        )}

      
      </div>
    </div>
  );
}

// Format seconds to MM:SS
function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

export default Stopwatch;
