import { Avatar } from "@mui/material";

const NameCompany = localStorage.getItem('NameCompany');

export const LogoIcon = () =>
    <Avatar src={require('./logotype.png')} style={{
        width: 40,
        height: 40
    }} />

export const LogoCompany = () =>     
    <Avatar src="/static/images/avatar/2.jpg" style={{
        width: 40,
        height: 40
    }} alt={NameCompany+""}/>