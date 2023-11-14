import {Logout} from "../../components/message/Logout";
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Button} from "@mui/material";

export const SettingsHome: React.FunctionComponent = () => {    
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
    "margin-left": '10px',
  }

  const handleClickDarkTheme = () => {
      localStorage.setItem("dark_theme", "dark");
      window.location.reload();
  }
  
  const handleClickLightTheme = () => {
      localStorage.setItem("dark_theme", "light");
      window.location.reload();
  }

  return (
    <>
        <Logout />
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Button variant="contained" onClick={handleClickLightTheme}>Светлая тема</Button>
            <Button sx={style} variant="contained" onClick={handleClickDarkTheme}>Тёмная тема</Button>
        </ThemeProvider>
    </>
  );
}