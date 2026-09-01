
import { useState, useEffect } from "react";

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (running) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [running]);

  const start = () => {
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setSeconds(0);
  };

  return (
    <div>
      <h2>Stopwatch</h2>

      <h3>{seconds} seconds</h3>

      <button onClick={start}>Start</button>

      <button onClick={pause}>Pause</button>

      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Stopwatch;