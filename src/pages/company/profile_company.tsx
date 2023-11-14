import { Box } from "@mui/material";
import React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ProfileCompany = () => {
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
                <h1>Профиль компании</h1>
            </ThemeProvider>
        </Box>
    )
}