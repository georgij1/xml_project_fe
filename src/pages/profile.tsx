import { Box } from "@mui/material";
import React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const Profile = () => {
    const style = {
        "margin": "10px"
    }

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: ' + localStorage.getItem("dark_theme") + ')');

    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
        }),
      [prefersDarkMode],
    );

    return (
        <Box sx={style}>
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="info">
                <div>Имя: {localStorage.getItem('login')}</div>
            </div>
            </ThemeProvider>
        </Box>
    );
}