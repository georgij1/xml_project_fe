export const EnterCompany = () => {
    function open_page_reg_company() {
        window.open('/home/reg_company', '_self')
    }

    return (
        <div className="content_enter_company">
            <div className="enter_company_form">
                <h1>Вход в компанию</h1>
                <input autoComplete='new-password' placeholder="Введите название компании..." className="input_name_company"/>
                <input autoComplete='new-password'  placeholder="Введите пароль от компании..." type="password" className="input_password_company"/>
                <div className="enter_company_btn">Войти</div>
            </div>

            <div className="text_registration_company">Если у вас ещё нет ни одной компании <div className="link_reg" onClick={open_page_reg_company}>зарегистрируйте её</div></div>
        </div>
    )
}