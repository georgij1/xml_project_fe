import React from "react";

interface profile_props {
    name?: string;
    age?: number;
    country: string;
    language: string;
    count_lang?: number;
}

export class Profile extends React.Component<profile_props> {
    static defaultProps = {
        name: localStorage.getItem('login'),
        age: 'Ещё не указано',
        language: 'Языков ещё не указанно',
        count_lang: 'Укажите языки, чтобы система посчитала колл-во языков',
        country: 'Страна ещё не указана'
    }

    render() {
        let {name, age, country, language, count_lang} = this.props;

        function change_info() {
            // @ts-ignore
            document.querySelector('.form_change_info').classList.add('block')
            // @ts-ignore
            document.querySelector('.info').classList.add('none')
            // @ts-ignore
            document.querySelector('.btn_close_profile').classList.add('none')
            // @ts-ignore
            document.querySelector('.btn_change_info').classList.add('none')
        }

        function close_edit_profile() {
            // @ts-ignore
            document.querySelector('.form_change_info').classList.remove('block')
            // @ts-ignore
            document.querySelector('.info').classList.remove('none')
            // @ts-ignore
            document.querySelector('.btn_close_profile').classList.remove('none')
            // @ts-ignore
            document.querySelector('.btn_change_info').classList.remove('none')
        }

        return (
            <div className="profile">
                <div className="btn_close_profile" onClick={() => {window.history.back()}}></div>
                <div className="info">
                    <div>Имя: {name}</div>
                    <div>Возраст: {age}</div>
                    <div>Страна: {country}</div>
                    <div>Языки: {language}</div>
                    <div>Колл-во языков: {count_lang}</div>
                </div>
                <div className="btn_change_info" onClick={change_info}>Изменить</div>

                <div className="form_change_info">
                    <div className="btn_close_profile" onClick={close_edit_profile}></div>
                    <div>
                        <label htmlFor="enter_new_login">Логин</label>
                        <input id="enter_new_login" className="edit_profile_input" placeholder="Введите новый логин..." value={name}/>
                    </div>
                    <div>
                        <label htmlFor="enter_age_person">Возраст</label>
                        {/*@ts-ignore*/}
                        <input id="enter_age_person" className="edit_profile_input" placeholder={age}/>
                    </div>
                    <div>
                        <label htmlFor="enter_country">Страна</label>
                        <input id="enter_country" className="edit_profile_input" placeholder={country}/>
                    </div>
                    <div>
                        <label htmlFor="enter_language">Язык</label>
                        <input id="enter_language" className="edit_profile_input" placeholder={language}/>
                    </div>
                    <div className="btn_change_info_success">Изменить</div>
                </div>
            </div>
        );
    }
}