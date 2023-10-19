// @ts-ignore
import {Logout} from "../components/message/Logout.tsx";

export const SupportHome = () => {
    if (localStorage.getItem('dark_theme')) {
        document.body.classList.add('dark_theme_body')
        return (
            <div>
                <Logout/>
                <h1 className="text-center flex justify-center h-screen items-center">Страница поддержки находится в разработке</h1>
            </div>
        )
    }

    else {
        document.body.classList.remove('dark_theme_body')
        return (
            <div>
                <Logout/>
                <h1 className="">Страница поддержки находится в разработке</h1>
            </div>
        )
    }
}