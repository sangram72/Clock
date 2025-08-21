import React, { useState, useEffect } from 'react';
import './Alarms.css';

function Alarms() {
  const [alarms, setAlarms] = useState([]);
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const current = now.toTimeString().slice(0, 5); // Format: HH:MM

      alarms.forEach(alarm => {
        if (alarm.time === current && !alarm.triggered) {
          alert(`⏰ Alarm: ${alarm.label || 'No label'}`);
          alarm.triggered = true; // mark as triggered
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms]);

  const addAlarm = () => {
    if (!time) return;
    const newAlarm = {
      time,
      label,
      id: Date.now(),
      triggered: false,
    };
    setAlarms(prev => [...prev, newAlarm]);
    setTime('');
    setLabel('');
  };

  const deleteAlarm = (id) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="alarms-container">
      <div className="alarms-box">
        <h2>Alarms</h2>

        <div className="alarms-buttons">
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="alarm-input"
          />
          <input
            type="text"
            placeholder="Label (optional)"
            value={label}
            onChange={e => setLabel(e.target.value)}
            className="alarm-input"
          />
          <button onClick={addAlarm} className="btn start">Add Alarm</button>
        </div>

        {alarms.length > 0 ? (
          <ul className="alarm-list">
            {alarms.map((alarm) => (
              <li key={alarm.id} className="alarm-item">
                <span>{alarm.time} - {alarm.label || 'No label'}</span>
                <button
                  onClick={() => deleteAlarm(alarm.id)}
                  className="btn reset"
                  style={{ minWidth: 'auto', padding: '4px 10px', fontSize: '14px' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#888', marginTop: '1rem' }}>No alarms set.</p>
        )}
      </div>
    </div>
  );
}

export default Alarms;
