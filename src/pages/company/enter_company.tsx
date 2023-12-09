import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Logout } from "../../components/message/Logout";

export const EnterCompany = () => {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get("login"),
          password: data.get("password"),
        });

        const body = {
            "NameCompany": data.get("login"),
            "PasswordCompany": data.get("password")
        }
        
        fetch(`http://10.3.9.83:8080/api/company/auth`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache'
            },
            mode: "cors"
        })
            .then((resp) => {
                console.log(resp.status)

                if (resp.status === 200) {
                    window.open('/home/company', '_self')
                    resp.text().then((event) => {
                        console.log(event)
                        localStorage.setItem('NameCompany', event)
                    })
                }

                else {
                    alert('Ошибка. Код ошибки: ' + resp.status)
                }
            })
            .catch((error) => {
                console.log(error)
            })
      };

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
        <ThemeProvider theme={theme}>
            <CssBaseline />            
            <Container component="main" maxWidth="xs">
                <Logout/>
                <Box
                sx={{  
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                Вход в комапнию
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label="Логин"
                    name="login"
                    inputProps={{
                        autocomplete: 'new-password'
                    }}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="пароль"
                    type="password"
                    id="password"
                    inputProps={{
                        autocomplete: 'new-password'
                    }}
                    aria-readonly

                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Войти
                </Button>
                <Grid container>
                    <Grid item>
                    <Link href="/home/reg_company" variant="body2">
                        {"Нету компании? Создайте её"}
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Container>
    </ThemeProvider>
    )
}