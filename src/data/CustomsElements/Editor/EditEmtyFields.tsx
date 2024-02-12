import * as React from 'react';
import { Modal } from '@mui/base/Modal';
import { Box, Button } from '@mui/material';

export const EditEmptyFields = (
    elements_edit: any
) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(elements_edit)

    return (
        <>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ 
                    width: 400,
                    position: 'absolute'
                }}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                        Text in a modal
                    </h2>
                    <p id="unstyled-modal-description" className="modal-description">
                        Aliquid amet deserunt earum!
                    </p>
                </Box>
            </Modal>
        </>
    )
}