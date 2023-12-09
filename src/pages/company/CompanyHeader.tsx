import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LogoCompany, LogoIcon } from './../../assets';

export const CompanyHeader = () => {
    const logout_company = () => {
        localStorage.removeItem('NameCompany')
        window.open('/', '_self')
    }

    const open_settings = () => {
        window.open(`/home/company/settings`, '_self')
    }

    const open_support = () => {
        window.open(`/home/company/support`, '_self')
    }

    const open_profile_person = () => {
        window.open(`/home/company/user/profile`, '_self')
    }

    const create_file = () => {
        window.open(`/home/company/create/file`, '_self')
    }

    const open_upload_file = () => {
        window.open(`/home/company/upload/file`, '_self')
    }

    const open_exit_account = () => {
        window.open(`/home/logout`, '_self')
    }

    const profile_company_func = () => {
        window.open(`/home/company/company/profile`, '_self')
    }

    const pages = ['Создать', 'Открыть', 'Настройки', 'Поддержка']

    const profile_user = ['Аккаунт пользователя', 'Выйти из аккаунта']

    const profile_company = ['Выйти из компании']

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElCompany, setAnchorElCompany] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleOpenCompanyMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCompany(event.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }
    
    const handleCloseCompanyMenu = () => {
        setAnchorElCompany(null);
    }

    const login = localStorage.getItem('login')

    const handleClickTab = (event: any) => {
        if (event.currentTarget.textContent === 'Создать') {
            create_file()
        } if (event.currentTarget.textContent === 'Открыть') {
            open_upload_file()
        } if (event.currentTarget.textContent === 'Настройки') {
            open_settings()
        } if (event.currentTarget.textContent === 'Поддержка') {
            open_support()
        } if (event.currentTarget.textContent === 'Аккаунт пользователя') {
            open_profile_person()
        } if (event.currentTarget.textContent === 'Выйти из аккаунта') {
            open_exit_account()
        } if (event.currentTarget.textContent === 'Профиль компании') {
            profile_company_func()
        } if (event.currentTarget.textContent === 'Выйти из компании') {
            logout_company()
        }
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
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <IconButton disableRipple onClick={handleOpenNavMenu} sx={{ p: 0 }}>
                                <LogoIcon />
                            </IconButton>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" onClick={(event) => handleClickTab(event)}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            XML
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <div onClick={(event) => handleClickTab(event)}>{page}</div>
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Stack direction="row" spacing={2}>
                                <Tooltip title="Пользователь">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={login+""} src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Компания">
                                    <IconButton disableRipple onClick={handleOpenCompanyMenu} sx={{ p: 0 }}>
                                        <LogoCompany />
                                    </IconButton>
                                </Tooltip>
                            </Stack>

                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {profile_user.map((profile_user) => (
                                    <MenuItem key={profile_user} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={(event) => handleClickTab(event)}>{profile_user}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                            
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElCompany}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElCompany)}
                                onClose={handleCloseCompanyMenu}
                            >
                                {profile_company.map((profile_company) => (
                                    <MenuItem key={profile_company} onClick={handleCloseCompanyMenu}>
                                        <Typography textAlign="center" onClick={(event) => handleClickTab(event)}>{profile_company}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}