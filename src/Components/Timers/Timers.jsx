import React, { useState, useEffect } from 'react';
import './Timers.css';
import { useAudioPlayer } from 'react-use-audio-player';

function Timers() {
  const [timer, setTimer] = useState(0);
  const [value, setValue] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const { play, pause, isPlaying, load } = useAudioPlayer();

  // Load sound on mount
  useEffect(() => {
    load({
      src: '/alarm.mp3', // Make sure this file exists in your public folder
      autoplay: false,
    });
  }, [load]);

  function handleStart() {
    if (intervalId || isNaN(Number(value)) || Number(value) <= 0) return;

    if (timer === 0) {
      setTimer(Number(value));
      setValue('');
    }

    const id = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(id);
          setIntervalId(null);
          play(); // Play sound
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
    setIsPaused(false);
  }

  function handlePauseResume() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsPaused(true);
    } else if (isPaused && timer > 0) {
      const id = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(id);
            setIntervalId(null);
            play(); // Play sound
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
      setIsPaused(false);
    }
  }

  function handleReset() {
    setTimer(0);
    setValue('');
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsPaused(false);
    pause(); // stop the sound
  }

  return (
    <div className="timer-box">
      <div className="timer">{timer}s</div>
      <input
        type="number"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="input"
        placeholder="Enter seconds"
      />
      <div className="buttons">
        <button onClick={handleStart} className="btn start">Start</button>
        <button onClick={handlePauseResume} className="btn halt">
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={handleReset} className="btn reset">Reset</button>
      
      </div>
    </div>
  );
}

export default Timers;
