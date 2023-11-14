import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ClosePage = () => {
    const handleClick = () => {
        window.history.back()
    }

    const style = {
        "margin": "10px"
    }

    return (
        <Button sx={style} variant="contained" onClick={handleClick}>
            <ArrowBackIcon/>
        </Button>
    )
}