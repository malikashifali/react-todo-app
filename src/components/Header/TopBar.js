import React, { useState, useEffect } from 'react'

export default function TopBar() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className='py-2 bg-dark navbar-dark text-white'>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <h5 className='mb-0'>{time}</h5>
          </div>
        </div>
      </div>
    </header>
  )
}
