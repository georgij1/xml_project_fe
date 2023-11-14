import { Box } from "@mui/material";
import {Logout} from "../../message/Logout";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';

export const CreateFile = () => {
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

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
            <Logout/>
            <Box sx={style}>Сервис по редактированию и созданию файла находится в разработке</Box>
        </Box>
        </ThemeProvider>
    )
}