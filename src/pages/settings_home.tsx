export const SettingsHome = () => {
    function light_theme() {
        localStorage.removeItem('dark_theme')
    }

    function dark_theme() {
        localStorage.setItem('dark_theme', String(true))
    }

    const select_theme = () => {
        // @ts-ignore
        console.log(document.querySelector('select').selectedOptions[0].textContent)
        // @ts-ignore
        document.querySelector('.btn_continue').classList.add('block')

        // @ts-ignore
        if (document.querySelector('select').selectedOptions[0].textContent === "Тёмная тема") {
            dark_theme()
        }

        else {
            light_theme()
        }
    }

    const accept_changed = () => {
        window.location.reload()
    }

    const select_active_push = () => {
        alert('Находится в разработке')
    }

    if (localStorage.getItem('dark_theme')) {
        // @ts-ignore
        document.querySelector('body').classList.add('dark_theme_body')

        return (
            <div className="dark_theme_body">
                <h1 className="text_settings">Настройки</h1>

                <div className="settings_theme">
                    <label htmlFor="setting_theme">Тёмная тема</label>
                    <select id="setting_theme" onClick={select_theme}>
                        <option>Светла тема</option>
                        {/*@ts-ignore*/}
                        <option selected="selected">Тёмная тема</option>
                    </select>
                </div>

                <div className="settings_theme">
                    <label htmlFor="setting_push_active">В сети (уведомление)</label>
                    <select id="setting_push_active" onClick={select_active_push}>
                        {/*@ts-ignore*/}
                        <option selected="selected">1 час</option>
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
        // @ts-ignore
        document.querySelector('body').classList.remove('dark_theme_body')

        return(
            <div>
                <h1 className="text_settings">Настройки</h1>

                <div className="settings_theme">
                    <label htmlFor="setting_theme">Тёмная тема</label>
                    <select id="setting_theme" onClick={select_theme}>
                        {/*@ts-ignore*/}
                        <option defaultValue="selected">Светла тема</option>
                        <option>Тёмная тема</option>
                    </select>
                </div>

                <div className="settings_theme">
                    <label htmlFor="setting_push_active">В сети (уведомление)</label>
                    <select id="setting_push_active" onClick={select_active_push}>
                        {/*@ts-ignore*/}
                        <option selected="selected">1 час</option>
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