import {ClipLoader} from "react-spinners";
import React from "react";

export const EnterCompany = () => {
    function open_page_reg_company() {
        window.open('/home/reg_company', '_self')
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

    function enter_company() {
        // @ts-ignore
        console.log(document.querySelector('.input_name_company').value)
        // @ts-ignore
        console.log(document.querySelector('.input_password_company').value)

        if (
            // @ts-ignore
            document.querySelector('.input_name_company').value.length === 0
            &&
            // @ts-ignore
            document.querySelector('.input_password_company').value.length === 0
        ) {
            // @ts-ignore
            document.querySelector('.input_name_company').classList.add('null_value_input')
            // @ts-ignore
            document.querySelector('.input_password_company').classList.add('null_value_input')
        }

        else {
            // @ts-ignore
            document.querySelector('.input_name_company').classList.remove('null_value_input')
            // @ts-ignore
            document.querySelector('.input_password_company').classList.remove('null_value_input')
            console.log('continue auth')
            activate_loader()

            let body = {
                // @ts-ignore
                "NameCompany": document.querySelector('.input_name_company').value,
                // @ts-ignore
                "PasswordCompany": document.querySelector('.input_password_company').value
            }

            let url = "http://localhost:8080/api/company/auth";
            console.log(localStorage.getItem('auth_token'))
            fetch(`${url}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Cache-Control': 'no-cache'
                },
                mode: "cors"
            })
                .then((resp) => {
                    console.log(resp.status)

                    if (resp.status === 200) {
                        distinctive_loader()
                        window.open('/home/company', '_self')
                        resp.text().then((event) => {
                            console.log(event)
                            localStorage.setItem('NameCompany', event)
                        })
                    }

                    else {
                        distinctive_loader()
                        alert('Ошибка. Код ошибки: ' + resp.status)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <div className="content_enter_company">
            <div className="enter_company_form">
                <h1>Вход в компанию</h1>
                <input autoComplete='new-password' placeholder="Введите название компании..." className="input_name_company"/>
                <input autoComplete='new-password'  placeholder="Введите пароль от компании..." type="password" className="input_password_company"/>
                <div className="enter_company_btn" onClick={enter_company}>Войти</div>
            </div>

            <div className="text_registration_company">Если у вас ещё нет ни одной компании <div className="link_reg" onClick={open_page_reg_company}>зарегистрируйте её</div></div>
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