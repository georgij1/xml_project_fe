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

export const RegCompany = () => {
    const handleSubmit = (event: any) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            name_company: data.get('name_company'),
            password_company: data.get('password_company'),
            desc_company: data.get('desc_company'),
            owner_company: data.get('owner_company'),
        })

        const body = {
            "name_company": data.get('name_company'),
            "password_company": data.get('password_company'),
            "desc_company": data.get('desc_company'),
            "owner_company": localStorage.getItem('owner_company')
        }

        fetch('http://10.3.9.83:8080/api/company/create', {
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
            if (resp.status === 200) {
                window.open('/home/enter_company', '_self')
            }

            else {
                alert('Ошибка. Код ошибки: ' + resp.status)
            }
        })
        .catch((error) => {
            console.log(error)
        })
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
                Регистрации компании
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name_company"
                    label="Имя компании"
                    name="name_company"
                    inputProps={{
                        autocomplete: 'new-password'
                    }}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password_company"
                    label="Пароль компании"
                    type="password"
                    id="password_company"
                    inputProps={{
                        autocomplete: 'new-password'
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="desc_company"
                    label="Описание компании"
                    id="desc_company"
                    inputProps={{
                        autocomplete: 'new-password'
                    }}
                />
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    name="owner_company"
                    label="Владелец компании"
                    id="owner_company"
                    autoComplete="owner_company"
                    defaultValue={localStorage.getItem('login')}
                    variant="outlined"
                    InputProps={{readOnly: true}}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Зарегистрировать
                </Button>
                <Grid container>
                    <Grid item>
                    <Link href="/home/enter_company" variant="body2">
                        {"Есть компании? Авторизуйтесь в ней"}
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Container>
    </ThemeProvider>
    )
}