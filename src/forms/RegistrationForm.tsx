export default function RegistrationForm() {
    function open_auth_page() {
        window.open(`/auth`, '_self')
    }

    function registration() {
        alert('Регистрация находится в разработке')
    }

    return(
        <div className="form_auth_company">
            <h1>Регистрация</h1>
            <div className="mini_form" >
                <label htmlFor="enter_name_company_input">Название компании</label>
                <input className="input_from_auth" id="enter_name_company_input" placeholder="Введите название компании..."/>
            </div>
            <div className="mini_form">
                <label htmlFor="enter_name_admin">Логин</label>
                <input className="input_from_auth" id="enter_name_admin" placeholder="Введите имя администратора..."/>
            </div>
            <div className="mini_form">
                <label htmlFor="enter_password_admin">Пароль</label>
                <input className="input_from_auth" id="enter_password_admin" placeholder="Введите пароль от администратора..."/>
            </div>
            <div className="btn_auth_company" onClick={registration}>Зарегистрироваться</div>

            <div className="reg">Если у вас есть аккаунта <div className="link_reg" onClick={open_auth_page}>авторизуйтесь</div></div>
        </div>
    )
}