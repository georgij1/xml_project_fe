import {Logout} from "../../components/message/Logout";
import React, {useState} from "react";
import {Months} from "./Months";

export const SettingsHome: React.FunctionComponent = () => {
    const [isOpen, setOpen] = useState<boolean>(true)
    const handleChange = () => setOpen(!isOpen)
    const light_theme = () => localStorage.removeItem('dark_theme')
    const dark_theme = () => localStorage.setItem('dark_theme', String(true))
    const [btnContinueClass, setBtnContinueClass] = useState('')
    const accept_changed = () => window.location.reload()
    const select_active_push = (event:any) => localStorage.setItem('MessageLogout', event.currentTarget.value+':00')
    if (localStorage.getItem('dark_theme')) {
        document.body.classList.add('dark_theme_body')

        return (
            <div className="dark_theme_body">
                <Logout/>
                <div className="settings_theme">
                    <label className="w-max	cursor-pointer" htmlFor="setting_theme">Тема</label>
                    <select id="setting_theme" className="bg-black	border-cyan-500/50 border-solid border-2 shadow-lg
                    shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none"
                            onChange={(e)=> {
                                setBtnContinueClass('block')
                                if (e.currentTarget.value === "Тёмная тема") dark_theme()
                                else light_theme()
                            }}>
                        <option defaultValue="selected">Светла тема</option>
                        <option>Тёмная тема</option>
                    </select>
                </div>
                <div className="settings_theme">
                    <label className="w-max	cursor-pointer" htmlFor="setting_push_active">В сети (уведомление)</label>
                    <input type="time" defaultValue={`${localStorage.getItem('MessageLogout')}`} onChange={select_active_push} className="bg-black	border-cyan-500/50 border-solid border-2 shadow-lg shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none" id="setting_push_active"/>
                    <div className="flex justify-between w-full">
                        <label>Фильтры в сети (автоматически)</label>
                        <label className="cursor-pointer" onClick={handleChange}>{isOpen ? <>Закрыть</> : <>Открыть</>}</label>
                    </div>
                    {isOpen ? <>
                        <Months/>
                        <div className="flex items-center m-1 gap-x-10">
                            <div className="border-cyan-500/50 border-solid border-2 shadow-lg cursor-no-drop p-2 rounded">{new Date().getDate()}</div>
                        </div>
                        <div className="flex items-center m-1 gap-x-10 mb-16">
                            <div className="border-cyan-500/50 border-solid border-2 shadow-lg cursor-no-drop p-2 rounded">{new Date().getFullYear()}</div>
                        </div>
                    </> : <></>}
                </div>
                <div className={"btn_continue "+btnContinueClass} onClick={accept_changed}>Перезагрузить страницу</div>
            </div>
        )
    }
    else {
        document.body.classList.remove('dark_theme_body')

        return(
            <>
                <Logout/>
                <div className="settings_theme">
                    <label className="w-max	cursor-pointer" htmlFor="setting_theme">Тема</label>
                    <select id="setting_theme" className="border-cyan-500/50 border-solid border-2 shadow-lg
                    shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none"
                        onChange={(e)=> {
                            setBtnContinueClass('block')
                            if (e.currentTarget.value === "Тёмная тема") dark_theme()
                            else light_theme()
                        }}>
                        <option defaultValue="selected">Светла тема</option>
                        <option>Тёмная тема</option>
                    </select>
                </div>
                <div className="settings_theme">
                    <label className="w-max	cursor-pointer" htmlFor="setting_push_active">В сети (уведомление)</label>
                    <input type="time" defaultValue={`${localStorage.getItem('MessageLogout')}`} onChange={select_active_push} className="border-cyan-500/50 border-solid border-2 shadow-lg shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none" id="setting_push_active"/>
                    <div className="flex justify-between w-full">
                        <label>Фильтры в сети (автоматически)</label>
                        <label className="cursor-pointer" onClick={handleChange}>{isOpen ? <>Закрыть</> : <>Открыть</>}</label>
                    </div>
                    {isOpen ? <>
                        <Months/>
                        <div className="flex items-center m-1 gap-x-10">
                            <div className="border-cyan-500/50 border-solid border-2 shadow-lg cursor-no-drop p-2 rounded">{new Date().getDate()}</div>
                        </div>
                        <div className="flex items-center m-1 gap-x-10 mb-16">
                            <div className="border-cyan-500/50 border-solid border-2 shadow-lg cursor-no-drop p-2 rounded">{new Date().getFullYear()}</div>
                        </div>
                    </> : <></>}
                </div>
                <div className={"btn_continue "+btnContinueClass} onClick={accept_changed}>Перезагрузить страницу</div>
            </>
        )
    }
}