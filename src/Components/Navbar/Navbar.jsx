
import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ selected = 'Timers', onSelect }) {
  const [active, setActive] = useState(selected);

  function handleSelect(option) {
    setActive(option);
    if (onSelect) onSelect(option);
  }

  return (
    <nav className="navbar">
      {/* <div className="navbar-logo">TimeApp</div> */}
      <ul className="navbar-options">
        <li>
          <button
            className={active === 'Stopwatch' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => handleSelect('Stopwatch')}
          >
            Stopwatch
          </button>
        </li>
        <li>
          <button
            className={active === 'Alarms' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => handleSelect('Alarms')}
          >
            Alarms
          </button>
        </li>
        <li>
          <button
            className={active === 'Timers' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => handleSelect('Timers')}
          >
            Timers
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
