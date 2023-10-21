import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Modal, Stack, Typography} from "@mui/material";
import {Messages} from "../components/message/Message";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid blue',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    outline: 'none'
}

const style_margin_auto = {
    margin: 'auto'
}

const style_height_auto = {
    height: '100vh'
}

export const BodyLogout = () => {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false)
    }

    const logout = () => new Messages().logout()

    const back = () => window.history.back()

    return (
        <div className="w-full">
            <Stack spacing={1} direction="row" style={style_height_auto}>
                <Button variant="contained" style={style_margin_auto} onClick={logout}>Выйти</Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Вы хотите выйти из системы?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box sx={{ '& button': { m: 1 } }}>
                            <Button variant="contained" size="large" onClick={logout}>Да</Button>
                            <Button variant="contained" size="large" onClick={back}>Нет</Button>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}