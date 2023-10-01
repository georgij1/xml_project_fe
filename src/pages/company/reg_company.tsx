import {ClipLoader} from "react-spinners";
import React from "react";

export const RegCompany = () => {
    const open_auth_company = () => {
        window.open('/home/enter_company', '_self')
    }

    const create_company = () => {
        const name_company = document.querySelector('.input_name_company')
        const password_company = document.querySelector('.input_password_company')
        const textarea_desc_company = document.querySelector('.textarea_desc_company')

        // @ts-ignore
        console.log(name_company.value)
        // @ts-ignore
        console.log(password_company.value)
        // @ts-ignore
        console.log(textarea_desc_company.value)

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
                activate_loader()

                const body = {
                    // @ts-ignore
                    "name_company": name_company.value,
                    // @ts-ignore
                    "password_company": password_company.value,
                    // @ts-ignore
                    "desc_company": textarea_desc_company.value,
                    "owner_company": localStorage.getItem('login')
                }

                activate_loader()

                const try_server_request_jwt_token = () => {
                    const url = "http://10.3.9.83:8080/api/company/create";
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
                            console.log(resp.text().then((event) => {console.log(event)}))
                            console.log(resp.status)

                            if (resp.status === 200) {
                                distinctive_loader()
                                window.open('/home/enter_company', '_self')
                                resp.text().then((event) => {
                                    console.log(event)
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

                try_server_request_jwt_token()
            }
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
                <div>
                    <label htmlFor="owner_company">Админ</label>
                    {/*@ts-ignore*/}
                    <input autoComplete='new-password' id="owner_company" type="text" readOnly value={localStorage.getItem('login')} className="input_password_company input_owner_company" placeholder="Введите пароль от компании..."/>
                </div>
                <div className="create_company_btn" onClick={create_company}>Создать</div>
            </div>
            <div className="exists_company">Если у вас уже есть компания <div className="link_reg" onClick={open_auth_company}>Войдите в неё</div></div>
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