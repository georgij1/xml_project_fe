import React from "react";
import {ClipLoader} from "react-spinners";

export const RegistrationForm = () => {
    function open_auth_page() {
        window.open(`/auth`, '_self')
    }

    function registration() {
        // @ts-ignore
        console.log("filed_first_name - ", document.querySelector('.first_name_field').value)
        // @ts-ignore
        console.log("filed_last_name - ", document.querySelector('.last_name_field').value)
        // @ts-ignore
        console.log("filed_second_name - ", document.querySelector('.second_name_field').value)
        // @ts-ignore
        console.log("filed_login - ", document.querySelector('.login_field').value)
        // @ts-ignore
        console.log("filed_password - ", document.querySelector('.password_field').value)
        // @ts-ignore
        console.log("filed_email - ", document.querySelector('.email_field').value)

        // checks on all fields
        if (
            // @ts-ignore
            document.querySelector('.first_name_field').value.length === 0
            &&
            // @ts-ignore
            document.querySelector('.last_name_field').value.length === 0
            &&
            // @ts-ignore
            document.querySelector('.second_name_field').value.length === 0
            &&
            // @ts-ignore
            document.querySelector('.login_field').value.length === 0
            &&
            // @ts-ignore
            document.querySelector('.password_field').value.length === 0
            &&
            // @ts-ignore
            document.querySelector('.email_field').value.length === 0
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
        ) {
            // @ts-ignore
            document.querySelector('.check_password_true').classList.add('block')
            // @ts-ignore
            document.querySelector('.check_password_false').classList.remove('block')
            // @ts-ignore
            console.log(document.querySelector('.email_field').value.includes('@'))
            // @ts-ignore
            document.querySelector('.continue').classList.add('block')
        }

        else {
            console.log('checks not running')
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

    function distinctive_loader() {
        // @ts-ignore
        document.querySelector('.loader').style.display = 'none'
        // @ts-ignore
        document.querySelector('body').style.opacity = '1'
        // @ts-ignore
        document.querySelector('body').style.overflow = 'auto'
    }

    function continue_registration() {
        activate_loader()
        let body = {
            // @ts-ignore
            "firstName": document.querySelector('.first_name_field').value,
            // @ts-ignore
            "lastName": document.querySelector('.last_name_field').value,
            // @ts-ignore
            "secondName": document.querySelector('.second_name_field').value,
            // @ts-ignore
            "login": document.querySelector('.login_field').value,
            // @ts-ignore
            "password": document.querySelector('.password_field').value,
            // @ts-ignore
            "email": document.querySelector('.email_field').value
        }
        console.log(body)
        fetch(`http://10.3.9.83:8080/api/v1/auth/register`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    window.open('/auth', '_self')
                }

                else {
                    distinctive_loader()
                    alert('Ошибка. Код ошибки ' + response.status)
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return(
        <div className="form_auth_company">
            <h1>Регистрация</h1>
            <div className="mini_form">
                <label htmlFor="enter_your_first_name">Имя</label>
                <input className="input_from_auth first_name_field" id="enter_your_first_name" placeholder="Введите своё имя..."/>
            </div>
            <div className="mini_form">
                <label htmlFor="enter_your_last_name">Фамилия</label>
                <input className="input_from_auth last_name_field" id="enter_your_last_name" placeholder="Введите свою фамилию..."/>
            </div>
            <div className="mini_form">
                <label htmlFor="enter_your_second_name">Отчество</label>
                <input className="input_from_auth second_name_field" id="enter_your_second_name" placeholder="Введите своё отчество..."/>
            </div>
            <div className="mini_form">
                <label htmlFor="enter_your_login">Логин</label>
                <input className="input_from_auth login_field" id="enter_your_login" placeholder="Придумайте свой логин..."/>
            </div>
            <div className="mini_form">
                <label htmlFor="enter_your_password">Пароль</label>
                <input type="password" className="input_from_auth password_field" id="enter_your_password" placeholder="Придумайте свой пароль..."/>
            </div>
            <div className="mini_form">
                <label htmlFor="enter_your_email">Email</label>
                <input className="input_from_auth email_field" id="enter_your_email" placeholder="Введите свой email..."/>
            </div>
            <div className="btn_auth_company" onClick={registration}>Зарегистрироваться</div>

            <div className="reg">Если у вас есть аккаунта <div className="link_reg" onClick={open_auth_page}>авторизуйтесь</div></div>

            <div className="checks_not_null">Проверка на длину полей пройдена</div>
            <div className="checks_null">Проверка на длину полей не пройдена</div>
            <div className="check_password_true">Проверка на длину пароля пройдена</div>
            <div className="check_password_false">Проверка на длину пароля не пройдена</div>
            <div className="continue" onClick={continue_registration}>Продолжить</div>
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