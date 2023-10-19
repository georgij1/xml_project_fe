import React from "react";

interface profile_props {
    name: string;
}

export class Profile extends React.Component<profile_props> {
    static defaultProps = {
        name: localStorage.getItem('login')
    }

    render() {
        const {name} = this.props;

        const change_info = () => {
            // @ts-ignore
            document.querySelector('.form_change_info').classList.add('block')
            // @ts-ignore
            document.querySelector('.info').classList.add('none')
            // @ts-ignore
            document.querySelector('.btn_close_profile').classList.add('none')
            // @ts-ignore
            document.querySelector('.btn_change_info').classList.add('none')
        }

        const close_edit_profile = () => {
            // @ts-ignore
            document.querySelector('.form_change_info').classList.remove('block')
            // @ts-ignore
            document.querySelector('.info').classList.remove('none')
            // @ts-ignore
            document.querySelector('.btn_close_profile').classList.remove('none')
            // @ts-ignore
            document.querySelector('.btn_change_info').classList.remove('none')
        }

        if (localStorage.getItem('dark_theme')) {
            document.body.classList.add('dark_theme_body')

            return (
                <div className="profile">
                    <div className="btn_close_profile" onClick={() => {window.history.back()}}></div>

                    <div className="bg-slate-600 items-center gap-5 p-5 rounded-lg flex">
                        <div>Имя: {name}</div>
                    </div>

                    <div className="btn_change_info" onClick={change_info}>Изменить</div>

                    <div className="form_change_info">
                        <div className="btn_close_profile" onClick={close_edit_profile}></div>

                        <div>
                            <label htmlFor="enter_new_login">Логин</label>
                            <input id="enter_new_login" className="edit_profile_input" placeholder="Введите новый логин..." value={name}/>
                        </div>

                        <div className="btn_change_info_success">Изменить</div>
                    </div>
                </div>
            );
        }

        else {
            document.body.classList.remove('dark_theme_body')
            return (
                <div className="profile">
                    <div className="btn_close_profile" onClick={() => {window.history.back()}}></div>

                    <div className="info">
                        <div>Имя: {name}</div>
                    </div>

                    <div className="btn_change_info" onClick={change_info}>Изменить</div>

                    <div className="form_change_info">
                        <div className="btn_close_profile" onClick={close_edit_profile}></div>

                        <div>
                            <label htmlFor="enter_new_login">Логин</label>
                            <input id="enter_new_login" className="edit_profile_input" placeholder="Введите новый логин..." value={name}/>
                        </div>

                        <div className="btn_change_info_success">Изменить</div>
                    </div>
                </div>
            );
        }
    }
}