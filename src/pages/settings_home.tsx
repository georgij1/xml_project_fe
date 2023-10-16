import {Logout} from "../components/message/Logout";
import React from "react";

export const SettingsHome = () => {
    const light_theme = () => {
        localStorage.removeItem('dark_theme')
    }

    const dark_theme = () => {
        localStorage.setItem('dark_theme', String(true))
    }

    const select_theme = () => {
        if (document.querySelector('select')) {
            // @ts-ignore
            console.log(document.querySelector('select').selectedOptions[0].textContent)
        }

        if (document.querySelector('.btn_continue')) {
            // @ts-ignore
            document.querySelector('.btn_continue').classList.add('block')
        }

        if (document.querySelector('select')) {
            // @ts-ignore
            console.log(document.querySelector('select').selectedOptions[0].textContent)

            // @ts-ignore
            if (document.querySelector('select').selectedOptions[0].textContent === "Тёмная тема") {
                dark_theme()
            }

            else {
                light_theme()
            }
        }
    }

    const accept_changed = () => {
        window.location.reload()
    }

    // @ts-ignore
    const select_active_push = (event) => {
        console.log("choose value - ",event.currentTarget.value)
        let date = new Date()
        let str_time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        console.log(str_time)
        localStorage.setItem('MessageLogout', event.currentTarget.value)
    }

    if (localStorage.getItem('dark_theme')) {
        if (document.querySelector('body')) {
            // @ts-ignore
            document.querySelector('body').classList.add('dark_theme_body')
        }

        return (
            <div className="dark_theme_body">
                <Logout/>
                <h1 className="text_settings">Настройки</h1>

                <div className="settings_theme">
                    <label htmlFor="setting_theme">Тёмная тема</label>
                    <select id="setting_theme" onChange={select_theme}>
                        <option>Светла тема</option>
                        <option selected>Тёмная тема</option>
                    </select>
                </div>

                <div className="settings_theme">
                    <label htmlFor="setting_push_active">В сети (уведомление)</label>
                    <select id="setting_push_active" onChange={(event)=>select_active_push(event)}>
                        <option selected>1 час</option>
                        <option>2 часа</option>
                        <option>3 часа</option>
                        <option>4 часа</option>
                        <option>5 часа</option>
                        <option>6 часа</option>
                        <option>7 часа</option>
                        <option>8 часа</option>
                        <option>9 часа</option>
                        <option>10 часа</option>
                        <option>11 часа</option>
                        <option>12 часа</option>
                        <option>13 часа</option>
                        <option>14 часа</option>
                        <option>15 часа</option>
                        <option>16 часа</option>
                        <option>17 часа</option>
                        <option>18 часа</option>
                        <option>19 часа</option>
                        <option>20 часа</option>
                        <option>21 часа</option>
                        <option>22 часа</option>
                        <option>23 часа</option>
                        <option>24 часа</option>
                    </select>
                </div>

                <div className="btn_continue" onClick={accept_changed}>Перезагрузить страницу</div>
            </div>
        )
    }

    else {
        if (document.querySelector('body')) {
            // @ts-ignore
            document.querySelector('body').classList.remove('dark_theme_body')
        }

        return(
            <div>
                <Logout/>

                <h1 className="text_settings">Настройки</h1>

                <div className="settings_theme">
                    <label htmlFor="setting_theme">Тёмная тема</label>
                    <select id="setting_theme" onClick={select_theme}>
                        <option defaultValue="selected">Светла тема</option>
                        <option>Тёмная тема</option>
                    </select>
                </div>

                <div className="settings_theme">
                    <label htmlFor="setting_push_active">В сети (уведомление)</label>
                    <select id="setting_push_active" onChange={(event)=>select_active_push(event)}>
                        <option selected>1 час</option>
                        <option>2 часа</option>
                        <option>3 часа</option>
                        <option>4 часа</option>
                        <option>5 часа</option>
                        <option>6 часа</option>
                        <option>7 часа</option>
                        <option>8 часа</option>
                        <option>9 часа</option>
                        <option>10 часа</option>
                        <option>11 часа</option>
                        <option>12 часа</option>
                        <option>13 часа</option>
                        <option>14 часа</option>
                        <option>15 часа</option>
                        <option>16 часа</option>
                        <option>17 часа</option>
                        <option>18 часа</option>
                        <option>19 часа</option>
                        <option>20 часа</option>
                        <option>21 часа</option>
                        <option>22 часа</option>
                        <option>23 часа</option>
                        <option>24 часа</option>
                    </select>
                </div>

                <div className="btn_continue" onClick={accept_changed}>Перезагрузить страницу</div>
            </div>
        )
    }
}