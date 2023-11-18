import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const AuthForm = () => {
    const handleSubmit = (event: any) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log(data)
        console.log({
            login: data.get('login'),
            password: data.get('password')
        })

        const body = {
            "login": data.get('login'),
            "password": data.get('password'),
        }

        fetch(`http://10.3.9.83:8080/api/user/auth/login`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            mode: "cors"
        })
            .then((response) => {
                console.log(response.status)
                if (response.status === 200) {
                    response.text().then((jwt_token) => {
                        console.log(jwt_token)
                        localStorage.setItem('auth_token', jwt_token)
                        localStorage.setItem('login', data.get('login') ? data.get('login') as string : '')
                        window.open("/home", '_self')
                    })
                }

                else {
                    alert('Ошибка. Код ошибки ' + response.status)
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
            sx={{  
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            }}
        >
            <Typography component="h1" variant="h5">
            Авторизация
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
                <Link href="/registration" variant="body2">
                    {"Нету аккаунта Создайте его"}
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        </Container>
    )
}