import {Logout} from "../../message/Logout";

export const CreateFile = () => {
    if (localStorage.getItem('dark_theme')) {
        document.body.classList.add('dark_theme_body')
        return(
            <div>
                <Logout/>
                <h1>Create file in the future</h1>
            </div>
        )
    }

    else {
        document.body.classList.remove('dark_theme_body')
        return(
            <div>
                <Logout/>
                <h1>Create file in the future</h1>
            </div>
        )
    }
}