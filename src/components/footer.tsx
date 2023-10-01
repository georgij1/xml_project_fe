export const Footer = () => {
    const data = new Date()
    const now_date = data.getFullYear()
    return (
        <div className="footer">
            <div>{now_date} г. Все права защищены &copy;</div>
        </div>
    )
}