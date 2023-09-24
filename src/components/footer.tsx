export const Footer = () => {
    let data = new Date()
    let now_date = data.getFullYear()
    return(
        <div className="footer">
            <div>{now_date} г. Все права защищены &copy;</div>
        </div>
    )
}