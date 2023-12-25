import { createTheme, useMediaQuery } from "@mui/material";
// import { prefersDarkMode } from "./PrefersDarkMode";
import React from "react";

export const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: useMediaQuery('(prefers-color-scheme: ' + localStorage.getItem("dark_theme") + ')') ? 'dark' : 'light',
        },
      }),
    [useMediaQuery('(prefers-color-scheme: ' + localStorage.getItem("dark_theme") + ')')],
);