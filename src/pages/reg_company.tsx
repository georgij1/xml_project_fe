import {ClipLoader} from "react-spinners";
import React from "react";

export const RegCompany = () => {
    function open_auth_company() {
        window.open('/home/enter_company', '_self')
    }

    function create_company() {
        const name_company = document.querySelector('.input_name_company')
        const password_company = document.querySelector('.input_password_company')
        const textarea_desc_company = document.querySelector('.textarea_desc_company')

        // @ts-ignore
        console.log(name_company.value)
        // @ts-ignore
        console.log(password_company.value)
        // @ts-ignore
        console.log(textarea_desc_company.value)
        // @ts-ignore
        if (
            // @ts-ignore
            name_company.value.length === 0
            &&
            // @ts-ignore
            password_company.value.length === 0
            &&
            // @ts-ignore
            textarea_desc_company.value.length === 0
        ) {
            if (name_company && password_company && textarea_desc_company) {
                name_company.classList.add('null_value_input')
                password_company.classList.add('null_value_input')
                textarea_desc_company.classList.add('null_value_input')
            }
        }

        // @ts-ignore
        else if (
            // @ts-ignore
            name_company.value.length > 0
            &&
            // @ts-ignore
            password_company.value.length === 0
            &&
            // @ts-ignore
            textarea_desc_company.value.length === 0
        ) {
            if (name_company && password_company && textarea_desc_company) {
                name_company.classList.remove('null_value_input')
                password_company.classList.add('null_value_input')
                textarea_desc_company.classList.add('null_value_input')
            }
        }

        // @ts-ignore
        else if (
            // @ts-ignore
            name_company.value.length === 0
            &&
            // @ts-ignore
            password_company.value.length > 0
            &&
            // @ts-ignore
            textarea_desc_company.value.length === 0
        ) {
            if (name_company && password_company && textarea_desc_company) {
                name_company.classList.add('null_value_input')
                password_company.classList.remove('null_value_input')
                textarea_desc_company.classList.add('null_value_input')
            }
        }

        // @ts-ignore
        else if (
            // @ts-ignore
            name_company.value.length === 0
            &&
            // @ts-ignore
            password_company.value.length === 0
            &&
            // @ts-ignore
            textarea_desc_company.value.length > 0
        ) {
            if (name_company && password_company && textarea_desc_company) {
                name_company.classList.add('null_value_input')
                password_company.classList.add('null_value_input')
                textarea_desc_company.classList.remove('null_value_input')
            }
        }

        else if (
            // @ts-ignore
            name_company.value.length > 0
            &&
            // @ts-ignore
            password_company.value.length > 0
            &&
            // @ts-ignore
            textarea_desc_company.value.length > 0
        ) {
            if (name_company && password_company && textarea_desc_company) {
                name_company.classList.remove('null_value_input')
                password_company.classList.remove('null_value_input')
                textarea_desc_company.classList.remove('null_value_input')
                console.log('continue reg')
                // activate_loader()

                // @ts-ignore
                function try_server_request_jwt_token() {
                    let url = "http://localhost:8080/api/company/create";
                    console.log(localStorage.getItem('auth_token'))
                    fetch(`${url}`, {
                        method: 'POST',
                        headers: {
                            "Accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                            'Content-Type': 'application/json',
                            'Connection': 'keep-alive',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Cache-Control': 'no-cache'
                        },
                        mode: "no-cors"
                    })
                        .then((resp) => resp.text())
                        .then(responseJson => {
                            console.log(responseJson)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }

                try_server_request_jwt_token()
            }
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

    // @ts-ignore
    return (
        <div>
            <div className="form_create_company">
                <div>
                    <label htmlFor="name_company">Имя</label>
                    <input autoComplete='new-password' id="name_company" className="input_name_company" placeholder="Введите название компании..."/>
                </div>
                <div>
                    <label htmlFor="password_company">Пароль</label>
                    <input autoComplete='new-password' id="password_company" type="password" className="input_password_company" placeholder="Введите пароль от компании..."/>
                </div>
                <div>
                    <label htmlFor="desc_company">Описание</label>
                    <textarea id="desc_company" className="textarea_desc_company" placeholder="Введите описание компании..."/>
                </div>
                <div className="create_company_btn" onClick={create_company}>Создать</div>
            </div>
            <div className="exists_company">Если у вас уже есть компания <div className="link_reg" onClick={open_auth_company}>Войдите в неё</div></div>
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