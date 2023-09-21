import {ClipLoader} from "react-spinners";
import React from "react";

export default function AuthForm() {
    function open_reg_page() {
        window.open(`/registration`, '_self')
    }

    function auth() {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        console.log(document.querySelector('.login_field').value)
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        console.log(document.querySelector('.password_field').value)
        if (
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            document.querySelector('.login_field').value.length===0
            &&
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            document.querySelector('.password_field').value.length===0
        ) {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            document.querySelector('.empty_all_fields').classList.add('block')
        }
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        else if (document.querySelector('.password_field').value.length>=6) {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            document.querySelector('.empty_all_fields').classList.remove('block')
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            document.querySelector('.check_password_true_1').classList.add('block')
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            document.querySelector('.continue_btn').classList.add('block')
            console.log('Проверка по паролю пройдена')
        }

        else {
            console.log('Валидность полей и валидность пароля не пройдена')
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            document.querySelector('.check_password_false_1').classList.add('block')
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            document.querySelector('.empty_all_fields').classList.add('block')
        }
    }

    function activate_loader() {
        // @ts-ignore
        document.querySelector('.loader').style.display = 'inline-block'
        // @ts-ignore
        document.querySelector('.loader').style.width = '150px'
        // @ts-ignore
        document.querySelector('.loader').style.height = '150px'
        // @ts-ignore
        document.querySelector('.loader').style.borderRadius = '100%'
        // @ts-ignore
        document.querySelector('.loader').style.borderColor = 'blue blue transparent'
        // @ts-ignore
        document.querySelector('.loader').style.borderImage = 'initial'
        // @ts-ignore
        document.querySelector('.loader').style.borderStyle = 'solid'
        // @ts-ignore
        document.querySelector('.loader').style.animation = '0.75s linear infinite normal both running react-spinners-ClipLoader-clip'
        // @ts-ignore
        document.querySelector('.loader').style.margin = 'auto'
        // @ts-ignore
        document.querySelector('.loader').style.position = 'absolute'
        // @ts-ignore
        document.querySelector('.loader').style.left = '40vW'
        // @ts-ignore
        document.querySelector('.loader').style.top = '30vW'
        // @ts-ignore
        document.querySelector('body').style.overflow='hidden'
        // @ts-ignore
        document.querySelector('body').style.opacity='0.5'
    }

    function continue_btn() {
        activate_loader()

        let body = {
            // @ts-ignore
            "login": document.querySelector('.login_field').value,
            // @ts-ignore
            "password": document.querySelector('.password_field').value
        }

        fetch(`http://10.3.9.83:8080/api/v1/auth/authenticate`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then((res) => {
                console.log(res.status)

                if (res.status === 200) {
                    res.json().then(data => {
                        console.log(data.jwt)
                        localStorage.setItem('auth_token', data.jwt)
                        window.open("/home", '_self')
                    })
                }

                else {
                    console.log('wrong')
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return(
        <div className="form_auth_company">
            <h1>Вход</h1>

            <div className="mini_form">
                <label htmlFor="enter_name_admin">Логин</label>
                <input className="input_from_auth login_field" id="enter_name_admin" placeholder="Введите имя администратора..."/>
            </div>

            <div className="mini_form">
                <label htmlFor="enter_password_admin">Пароль</label>
                <input type="password" className="input_from_auth password_field" id="enter_password_admin" placeholder="Введите пароль от администратора..."/>
            </div>

            <div className="btn_auth_company" onClick={auth}>Войти</div>

            <div className="reg">Если у вас нет аккаунта <div className="link_reg" onClick={open_reg_page}>зарегистрируйтесь</div></div>
            <div className="empty_all_fields">Не все поля заполнены</div>
            <div className="check_password_true_1">Проверка по паролю пройдена</div>
            <div className="check_password_false_1">Проверка по паролю не пройдена</div>

            <div className="continue_btn" onClick={continue_btn}>Продолжить</div>
            {/*@ts-ignore*/}
            <ClipLoader
                style={{display: "none"}}
                color={'blue'}
                // loading={loading}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="loader"
            />
        </div>
    )
}