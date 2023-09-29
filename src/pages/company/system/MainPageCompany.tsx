import React from "react";

export const MainPageCompany = () => {
    return (
        <div>
            <div>
                <h1>NameCompany - {localStorage.getItem('NameCompany')}</h1>
            </div>
        </div>
    )
}