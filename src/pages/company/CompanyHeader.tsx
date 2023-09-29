import React from "react";

export const CompanyHeader = () => {
    function logout_company() {
        localStorage.removeItem('NameCompany')
        window.history.back()
    }

    return (
        <div>
            <div className="btn_logout" onClick={logout_company}>Выйти из компании</div>
        </div>
    )
}