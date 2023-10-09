export const ClosePage = () => {
    if (window.location.pathname === "/home/company/look/file") {
        const delete_info_file = () => {
            localStorage.removeItem('id_image')
            localStorage.removeItem('image_name')
            localStorage.removeItem('type')
            localStorage.removeItem('data')
            localStorage.removeItem('time_stamp')
            localStorage.removeItem('name_company')
            window.history.back()
        }

        return (
            <div className="btn_close_page" onClick={
                delete_info_file
            }></div>
        )
    }

    else {
        return (
            <div className="btn_close_page" onClick={
               () => {window.history.back()}
            }></div>
        )
    }
}