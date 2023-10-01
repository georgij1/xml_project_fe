import React from "react";
import {ClipLoader} from "react-spinners";

export const RegistrationForm = () => {
    const open_auth_page = () => {
        window.open(`/auth`, '_self')
    }

    const registration = () => {
        // @ts-ignore
        console.log("filed_login - ", document.querySelector('.login_field').value)
        // @ts-ignore
        console.log("filed_password - ", document.querySelector('.password_field').value)
        // @ts-ignore
        console.log("filed_email - ", document.querySelector('.password_repeat_field').value)

        if (
            // @ts-ignore
            document.querySelector('.login_field').value.length === 0
            &&
            // @ts-ignore
            document.querySelector('.password_field').value.length === 0
            &&
            // @ts-ignore
            document.querySelector('.password_repeat_field').value.length === 0
        ) {
            console.log('fields is null')
            // @ts-ignore
            document.querySelector('.checks_null').classList.add('block')
            // @ts-ignore
            document.querySelector('.checks_null').classList.remove('none')
            // @ts-ignore
            document.querySelector('.checks_null').classList.remove('none')
            // @ts-ignore
            document.querySelector('.checks_not_null').classList.remove('none')
            // @ts-ignore
            document.querySelector('.checks_not_null').classList.remove('block')
        }

        else if (
            // @ts-ignore
            document.querySelector('.password_field').value.length >= 6
            &&
            // @ts-ignore
            document.querySelector('.password_repeat_field').value.length >= 6
        ) {
            // @ts-ignore
            document.querySelector('.check_password_true').classList.add('block')
            // @ts-ignore
            document.querySelector('.check_password_false').classList.remove('block')
            // @ts-ignore
            document.querySelector('.continue').classList.add('block')
        }

        else {
            console.log('checks not running')
        }
    }

    const activate_loader = () => {
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

    const distinctive_loader = () => {
        // @ts-ignore
        document.querySelector('.loader').style.display = 'none'
        // @ts-ignore
        document.querySelector('body').style.opacity = '1'
        // @ts-ignore
        document.querySelector('body').style.overflow = 'auto'
    }

    const continue_registration = () => {
        activate_loader()
        const body = {
            // @ts-ignore
            "login": document.querySelector('.login_field').value,
            // @ts-ignore
            "password": document.querySelector('.password_field').value,
            // @ts-ignore
            "RepeatPassword": document.querySelector('.password_repeat_field').value
        }
        console.log(body)
        fetch(`http://10.3.9.83:8080/api/user/auth/registration`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors'
        })
            .then((response) => {
                if (response.status === 303) {
                    window.open('/auth', '_self')
                }

                else {
                    distinctive_loader()
                    alert('Ошибка. Код ошибки ' + response.status)
                }

                console.log(response.text())
                console.log(response.status)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return(
        <div className="form_auth_company">
            <h1>Регистрация</h1>

            <div className="mini_form">
                <label htmlFor="enter_your_login">Логин</label>
                <input className="input_from_auth login_field" id="enter_your_login" placeholder="Придумайте свой логин..."/>
            </div>

            <div className="mini_form">
                <label htmlFor="enter_your_password">Пароль</label>
                <input type="password" className="input_from_auth password_field" id="enter_your_password" placeholder="Придумайте свой пароль..."/>
            </div>

            <div className="mini_form">
                <label htmlFor="enter_repeat_your_password">Повторение пароля</label>
                <input type="password" className="input_from_auth password_repeat_field" id="enter_repeat_your_password" placeholder="Повторите свой придуманный пароль..."/>
            </div>

            <div className="btn_auth_company" onClick={registration}>Зарегистрироваться</div>

            <div className="reg">Если у вас есть аккаунта <div className="link_reg" onClick={open_auth_page}>авторизуйтесь</div></div>

            <div className="checks_not_null">Проверка на длину полей пройдена</div>
            <div className="checks_null">Проверка на длину полей не пройдена</div>
            <div className="check_password_true">Проверка на длину пароля пройдена</div>
            <div className="check_password_false">Проверка на длину пароля не пройдена</div>
            <div className="continue" onClick={continue_registration}>Продолжить</div>
            <ClipLoader
                style={{display: "none"}}
                color={'blue'}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="loader"
            />
        </div>
    )
}