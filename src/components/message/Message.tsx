export  class Messages {
    logout() {
        localStorage.removeItem('menu')
        localStorage.removeItem('NameCompany')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('dark_theme')
        localStorage.removeItem('login')
        localStorage.removeItem('MessageLogout')
        window.open('/auth', '_self')
    }
}