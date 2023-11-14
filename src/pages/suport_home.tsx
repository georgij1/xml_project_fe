import {Logout} from "../components/message/Logout";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import { Box } from "@mui/material";

export const SupportHome = () => {
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

    const style = {
        "margin": '10px',
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Logout/>
            <Box sx={style}>Страница поддержки находится в разработке</Box>
        </ThemeProvider>
    )
}