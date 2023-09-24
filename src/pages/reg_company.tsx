export const RegCompany = () => {
    function open_auth_company() {
        window.open('/home/enter_company', '_self')
    }

    function create_company() {
        // @ts-ignore
        console.log(document.querySelector('.input_name_company').value)
        // @ts-ignore
        console.log(document.querySelector('.input_password_company').value)
        // @ts-ignore
        console.log(document.querySelector('.textarea_desc_company').value)
        // @ts-ignore
        if (document.querySelector('.input_name_company').value.length === 0) {

        }
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
        </div>
    )
}