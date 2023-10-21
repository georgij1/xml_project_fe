import React from "react";
import {Logout} from "./message/Logout";

export const Body = () => {
    const enter_company = () => window.open('/home/enter_company', '_self')
    const reg_company = () => window.open('/home/reg_company', '_self')
    if (localStorage.getItem('dark_theme')) {
        document.body.classList.add('dark_theme_body')
        return(
            <div className="body">
                <Logout/>
                <div className="btn_enter_company btn_enter_company_dark" onClick={enter_company}>Войти в компанию</div>
                <div className="text_registration_company">Если вы ещё не регистрировали компанию в системе <p className="link_reg link_reg_company" onClick={reg_company}>зарегистрируйте её</p></div>
            </div>
        )
    }
    else {
        document.body.classList.remove('dark_theme_body')
        return(
            <div className="body">
                <Logout/>
                <div className="btn_enter_company" onClick={enter_company}>Войти в компанию</div>
                <div className="text_registration_company">Если вы ещё не регистрировали компанию в системе <p className="link_reg link_reg_company" onClick={reg_company}>зарегистрируйте её</p></div>
            </div>
        )
    }
}