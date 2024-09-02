'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';

const useTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const getTimeString = useCallback((date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours}:${formattedMinutes} ${isPM ? 'PM' : 'AM'}`;
  }, []);

  const formatTime = useCallback(
    (date: Date) => {
      const timeString = getTimeString(date);
      const dayOptions = { weekday: 'short' as 'short' };
      const monthOptions = {
        month: 'short' as 'short',
        day: 'numeric' as 'numeric',
      };
      const dayString = date.toLocaleDateString('en-US', dayOptions);
      const monthString = date.toLocaleDateString('en-US', monthOptions);

      return `${timeString} • ${dayString}, ${monthString}`;
    },
    [getTimeString]
  );

  const currentDateTime = useMemo(() => formatTime(time), [time, formatTime]);

  const currentTime = useMemo(() => getTimeString(time), [time, getTimeString]);

  return { currentDateTime, currentTime };
};

export default useTime;
