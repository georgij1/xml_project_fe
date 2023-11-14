import { Box, Button } from "@mui/material";
import React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Logout} from "./message/Logout";

export const Body = () => {
    const enter_company = () => window.open('/home/enter_company', '_self')
    const reg_company = () => window.open('/home/reg_company', '_self')

    const styleBtnEnterCompany = {
        "display": "block",
        "margin": "auto"
    }
    
    const styleBtnRegCompany = {
        "display": "block",
        "margin": "30px auto"
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

    const style = {
        "margin-top": "35vh",
        "display": "flex",
        "flex-direction": "column",
        "justifyContent": "center",
    }
    
    return(
        <Box sx={style}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Button variant="contained" sx={styleBtnEnterCompany} onClick={enter_company}>Войти в компанию</Button>
                <Button variant="contained" sx={styleBtnRegCompany} onClick={reg_company}>зарегистрируйте её</Button>
                <Logout/>
            </ThemeProvider>
        </Box>
    )
}