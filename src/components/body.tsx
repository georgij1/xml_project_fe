import React from "react";

export const Body = () => {
    function enter_company() {
        window.open('/home/enter_company', '_self')
    }

    function reg_company() {
        window.open('/home/reg_company', '_self')
    }

    return(
        <div className="body">
            <div className="btn_enter_company" onClick={enter_company}>Войти в компанию</div>
            <div className="text_registration_company">Если вы ещё не регистрировали компанию в системе <p className="link_reg link_reg_company" onClick={reg_company}>зарегистрируйте её</p></div>
        </div>
    )
}

export default Body;