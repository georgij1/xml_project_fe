import { Box, Tooltip } from "@mui/material"
import { useEffect, useState } from "react"

export const Logout = () => {
    const style = {
        "position": "fixed",
        "bottom": "10px",
        "right": "10px",
        "background": "grey",
        "color": "#FFF",
        "z-index": "100",
        "padding": "10px",
        "border-radius": "10px",
        "cursor": "default"
    }

    const [time, setTime] = useState(43200);

    if (time <= 0) {
        window.open('/logout', '_self')
    }

    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    const formatTime = (time : any) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Box sx={style}>
            <Tooltip title="Время до выхода из сестемы">
                <span>{formatTime(time)}</span>
            </Tooltip>
        </Box>
    )
}