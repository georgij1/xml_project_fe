import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const RegistrationForm = () => {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({password: data.get("password")});
        // console.log({
        //     login: data,
        //     password: data.get("password"),
        //     RepeatPassword: data.get("RepeatPassword"),
        // });

        const body = {
            "login": data.get("login"),
            "password": data.get("password"),
            "RepeatPassword": data.get("RepeatPassword")
        }

        fetch(`http://10.3.9.83:8080/api/user/auth/registration`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors'
        })
            .then((response) => {
                console.log(response.status);

                if (response.status === 303) {
                    console.log(data)
                    window.open('/auth', '_self')
                }

                else {
                    alert('Ошибка. Код ошибки ' + response.status)
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return(
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
            Регистрация
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
                helperText="Пароль должен содержать 8 символов"

            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="RepeatPassword"
                label="Повторите пароль"
                type="password"
                id="RepeatPassword"
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
                Зарегистрироваться
            </Button>
            <Grid container>
                <Grid item>
                <Link href="/auth" variant="body2">
                    {"Есть акааунт? Авторизуйтесь в нём"}
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        </Container>
    )
}