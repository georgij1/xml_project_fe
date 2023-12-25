import { createTheme } from "@mui/material";
import React from "react";

export const CreateTheme = (
    prefersDarkMode: boolean
) => {
    React.useMemo(
        () =>
          createTheme({
            palette: {
              mode: prefersDarkMode ? 'dark' : 'light',
            },
          }),
        [prefersDarkMode],
      );
}