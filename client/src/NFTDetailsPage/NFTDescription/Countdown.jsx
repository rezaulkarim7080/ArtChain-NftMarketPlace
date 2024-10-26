import React, { useState, useEffect } from "react";

const Countdown = ({ initialTime, largeFontClass, FontClass }) => {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(initialTime));

  // Calculate remaining time based on initial time
  function getRemainingTime(initialTime) {
    const now = Date.now();
    const endTime = initialTime + 7 * 24 * 60 * 60 * 1000; // 7 days from initialTime
    return endTime - now;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1000) {
          // Reset to 7 days when time runs out
          return getRemainingTime(Date.now());
        }
        return prevTimeLeft - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className={FontClass}>
        <p className={FontClass}>{days}</p>
        <span className="font-medium">Days</span>
      </div>
      <div className={FontClass}>
        <p className={FontClass}>{hours}</p>
        <span className="font-medium">Hours</span>
      </div>
      <div className={FontClass}>
        <p className={FontClass}>{minutes}</p>
        <span className="font-medium">Min</span>
      </div>
      <div className={FontClass}>
        <p className={FontClass}>{seconds}</p>
        <span className="font-medium">Sec</span>
      </div>
    </div>
  );
};

export default Countdown;
