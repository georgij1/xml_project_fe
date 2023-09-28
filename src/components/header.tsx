export const Header = () => {
    function logout() {
        localStorage.clear()
        window.open('/auth', '_self')
    }

    function open_profile_person() {
        window.open('/home/profile', '_self')
    }

    function open_header() {
        // @ts-ignore
        document.querySelector('.open_header_320').classList.add('block')
        // @ts-ignore
        document.querySelector('.burger_menu').classList.add('none')
        // @ts-ignore
        document.querySelector('.close_menu').classList.add('block')
        // @ts-ignore
        document.querySelector('body').classList.add('body_no_scroll')
    }

    function close_menu() {
        // @ts-ignore
        document.querySelector('.open_header_320').classList.remove('block')
        // @ts-ignore
        document.querySelector('.burger_menu').classList.remove('none')
        // @ts-ignore
        document.querySelector('.close_menu').classList.remove('block')
        // @ts-ignore
        document.querySelector('body').classList.remove('body_no_scroll')
    }

    function open_support() {
        window.open('/home/support', '_self')
    }

    function open_settings() {
        window.open('/home/settings', '_self')
    }

    function open_home_page() {
        window.open('/', '_self')
    }

    // const headers = {
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    // }

    function try_server_request_jwt_token() {
        let url = "http://localhost:8080/api/v1/users";
        console.log(localStorage.getItem('auth_token'))
        fetch(`${url}`, {
            headers: {
                // "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                // // 'Content-Type': 'application/json',
                // // 'Connection': 'keep-alive',
                // 'Accept-Encoding': 'gzip, deflate, br',
                // 'Cache-Control': 'no-cache'
            },
            // mode: "no-cors"
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

    return(
        <div className="header">
            <div className="header_320">
                <div className="header_1">
                    <div className="logotype" onClick={open_home_page}></div>
                </div>
                <div className="close_menu" onClick={close_menu}></div>
                <div className="burger_menu" onClick={open_header}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                        <linearGradient id="EIPc0qTNCX0EujYwtxKaXa_MmupZtPbnw66_gr1" x1="12.066" x2="34.891" y1=".066" y2="22.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stopColor="#3bc9f3"></stop><stop offset=".85" stopColor="#1591d8"></stop></linearGradient><path fill="url(#EIPc0qTNCX0EujYwtxKaXa_MmupZtPbnw66_gr1)" d="M43,15H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,14.1,44.1,15,43,15z"></path><linearGradient id="EIPc0qTNCX0EujYwtxKaXb_MmupZtPbnw66_gr2" x1="12.066" x2="34.891" y1="12.066" y2="34.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stopColor="#3bc9f3"></stop><stop offset=".85" stopColor="#1591d8"></stop></linearGradient><path fill="url(#EIPc0qTNCX0EujYwtxKaXb_MmupZtPbnw66_gr2)" d="M43,27H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,26.1,44.1,27,43,27z"></path><linearGradient id="EIPc0qTNCX0EujYwtxKaXc_MmupZtPbnw66_gr3" x1="12.066" x2="34.891" y1="24.066" y2="46.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stopColor="#3bc9f3"></stop><stop offset=".85" stopColor="#1591d8"></stop></linearGradient><path fill="url(#EIPc0qTNCX0EujYwtxKaXc_MmupZtPbnw66_gr3)" d="M43,39H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,38.1,44.1,39,43,39z"></path>
                    </svg>
                </div>
            </div>

            <div className="open_header_320">
                <div className="btn_settings" onClick={open_settings}>Настройки</div>
                <div className="btn_open_support" onClick={open_support}>Поддержка</div>
                <div className="btn_open_profile" onClick={open_profile_person}>{localStorage.getItem('login')}</div>
                <div onClick={logout} className="btn_logout">Выйти</div>
            </div>

            <div className="header_768">
                <div className="header_1">
                    <div className="logotype" onClick={open_home_page}></div>
                    <div className="down_line" onClick={open_settings}>Настройки</div>
                    <div className="down_line" onClick={open_support}>Поддержка</div>
                </div>
                <div className="header_1">
                    <div className="NamePerson" onClick={open_profile_person}>{localStorage.getItem('login')}</div>
                    <div onClick={logout} className="logout_btn">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="0.5" x2="15" y2="0.5" stroke="white"/>
                            <line x1="0.5" y1="1" x2="0.5" y2="15" stroke="white"/>
                            <line y1="14.5" x2="15" y2="14.5" stroke="white"/>
                            <path d="M13.3536 8.35355C13.5488 8.15829 13.5488 7.84171 13.3536 7.64645L10.1716 4.46447C9.97631 4.2692 9.65973 4.2692 9.46447 4.46447C9.2692 4.65973 9.2692 4.97631 9.46447 5.17157L12.2929 8L9.46447 10.8284C9.2692 11.0237 9.2692 11.3403 9.46447 11.5355C9.65973 11.7308 9.97631 11.7308 10.1716 11.5355L13.3536 8.35355ZM3 8.5H13V7.5H3V8.5Z" fill="white"/>
                            <line x1="14.5" y1="1" x2="14.5" y2="4" stroke="white"/>
                            <line x1="14.5" y1="11" x2="14.5" y2="14" stroke="white"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}