import { Box, Tooltip } from "@mui/material"
import { useState, useEffect } from 'react';

export const Logout = () => {
    const style = {
        "position": "fixed",
        "bottom": "10px",
        "right": "10px",
        "background": "grey",
        "color": "#FFF",
        "z-index": "99999999",
        "padding": "10px",
        "border-radius": "10px",
        "cursor": "default"
    }

    const [time, setTime] = useState(
      parseInt(localStorage.getItem('time_logout') || '43200', 10)
    );

    if (time <= 0) {
      window.open('/logout', '_self');
    }

    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    useEffect(() => {
      localStorage.setItem('time_logout', time.toString());
    }, [time]);
  
    const formatTime = (time: number) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
  
    return (
      <Box sx={style}>
        <Tooltip title="Время выхода из системы">
        <span>{formatTime(time)}</span>
        </Tooltip>
      </Box>
    );
}