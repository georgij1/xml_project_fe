export default function AuthForm() {
    function open_reg_page() {
        window.open(`/registration`, '_self')
    }

    function auth() {
        alert('Авторизация находится в разработке')
    }

    return(
        <div className="form_auth_company">
            <h1>Вход</h1>
            <div className="mini_form">
                <label htmlFor="enter_name_admin">Логин</label>
                <input className="input_from_auth" id="enter_name_admin" placeholder="Введите имя администратора..."/>
            </div>
            <div className="mini_form">
                <label htmlFor="enter_password_admin">Пароль</label>
                <input className="input_from_auth" id="enter_password_admin" placeholder="Введите пароль от администратора..."/>
            </div>
            <div className="btn_auth_company" onClick={auth}>Войти</div>

            <div className="reg">Если у вас нет аккаунта <div className="link_reg" onClick={open_reg_page}>зарегистрируйтесь</div></div>
        </div>
    )
}