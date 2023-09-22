function Header() {
    function logout() {
        localStorage.clear()
        window.open('/auth', '_self')
    }

    return(
        <div className="header">
            <h1>Header</h1>
            <p onClick={logout} className="logout_btn">Выйти</p>
        </div>
    )
}

export default Header;