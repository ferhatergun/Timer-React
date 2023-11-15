import React, { useState, useEffect } from 'react';
import './App.css';

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setIsRunning(false);
          // Zaman bittiğinde ve durdurulduğunda burada başka bir işlem yapabilirsiniz.
        } else {
          if (seconds === 0) {
            setMinutes(prevMinutes => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds(prevSeconds => prevSeconds - 1);
          }
        }
      }, 1000);
    }

    // Komponent ayrıldığında interval'i temizle
    return () => clearInterval(interval);
  }, [minutes, seconds, isRunning]);

  const toggleTimer = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(1);
    setSeconds(0);
  };
  // onChange kısımlarına 59 dan fazla girilmesi durumund hata gösterilebilir 1 saatte bunu ekleyemedim

  const starter = () => {
    setIsRunning(true)
    setIsStart(true)
  }
  const stopped = () => {
    setIsRunning(false)
    setIsStart(false)
  }

  return (
    <div className='body'>
      <div className='header'>React Timer</div>
      <div className='card'>
        {
          !isStart ? 
          <>
            <input type='number' 
            placeholder='dakika' 
            onChange={e => setMinutes(e.target.value)} 
            className='inputdk'
            />
            <input type='number' 
            placeholder='saniye'
            onChange={e => setSeconds(e.target.value)} 
            className='inputsn'
            />
            <button className='btn' onClick={starter}>Başla</button>
          </>
          :
          <>
            <p>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
            <button className="btn" onClick={toggleTimer}>{isRunning ? 'Durdur' : 'Devam Et'}</button>
            <button className="btn" onClick={resetTimer}>Sıfırla</button>
            <button className="btn" onClick={stopped}>Yeniden Başla</button>
          </>
        }
          


      </div>
    </div>
  );
};

export default CountdownTimer;
