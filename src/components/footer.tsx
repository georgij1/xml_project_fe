import { Box } from "@mui/material"

export const Footer = () => {
    const data = new Date()
    const now_date = data.getFullYear()

    const style = {
        "position": "fixed",
        "bottom": "0",
        "background": "black",
        "color": "#FFF",
        "padding": "20px 0",
        "width": "100%",
        "text-align": "center",
        "display": "flex",
        "justify-content": "center"
    }

    return (<Box sx={style}>{now_date} г. Все права защищены &copy;</Box>)
}