import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import {Logout} from "../components/message/Logout";
import { ClosePageProfile } from "./ClosePageProfile";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const Profile = () => {

    function generateWord(element: React.ReactElement) {
      return [0].map((value) =>
        React.cloneElement(element, {
          key: value,
        }),
      );
    }
    function generatePDF(element: React.ReactElement) {
      return [0].map((value) =>
        React.cloneElement(element, {
          key: value,
        }),
      );
    }function generateXML(element: React.ReactElement) {
      return [0].map((value) =>
        React.cloneElement(element, {
          key: value,
        }),
      );
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

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick = () => {
      window.history.back()
  }

  const styleBtn_1 = {
      "margin": "10px",
  }

  const style = {
      "display": "flex",
      "justify-content": "space-between",
      "align-items": "center",
      "width": "100%",
  }

  const style_main = {
    "margin": "10px"
  }

  const style_modal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

    return (
        <Box sx={style_main}>
                  <Box sx={style}>
            <Button sx={styleBtn_1} variant="contained" onClick={handleClick}>
                <ArrowBackIcon/>
            </Button>
        
            <Button sx={styleBtn_1} variant="contained" onClick={() => {
                handleOpen()
            }}>
                <ModeEditIcon/>
            </Button>
        </Box>
          <Logout />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
            <Typography variant="h6" component="div">
            Информация о себе
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {localStorage.getItem("dark_theme") === "dark" ? <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DarkModeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Тема" secondary="тёмная тема включена" />
              </ListItem> : <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LightModeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Тема" secondary="светлая тема включена" />
              </ListItem>}
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Логин" secondary={localStorage.getItem("login")} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Комапния" secondary={localStorage.getItem("NameCompany")} />
              </ListItem>
            </List>
            <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Конвертация документов
          </Typography>
          <Demo>
            <List dense={dense}>
              {generateWord(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="word"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
              {generatePDF(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="pdf"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
              {generateXML(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="xml"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>
              <Button variant="contained" color="error">
                Удалить
              </Button>
          </Box>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Изменение информации оо себе
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, "display": "flex", "flexDirection": "column", "gap": "10px" }}>
            <TextField label="Логин" variant="outlined" />
            <TextField label="Компания" variant="outlined" />
            <TextField label="Информация о себе" variant="outlined" />
            <Button variant="contained" color="success">
              Сохранить
            </Button>
          </Typography>
        </Box>
      </Modal>
          </ThemeProvider>
        </Box>
    );
}