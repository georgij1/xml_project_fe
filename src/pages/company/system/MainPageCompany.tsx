import React from "react";
import "../company.css"
// @ts-ignore
import {ListFiles} from '../../../components/company/ListFiles/ListFiles.tsx';

export const MainPageCompany = () => {
    return (
        <div className="body_page_company">
            <div>
                <h1 className="text-3xl font-bold underline">NameCompany - {localStorage.getItem('NameCompany')}</h1>
            </div>
            <div className="tools_header">
                <div className="open_file_btn" onClick={() => {window.open('/home/company/upload/file', '_self')}}>Загрузить файл</div>
                <div className="btn_create_file" onClick={() => {window.open('/home/company/create/file', '_self')}}>Создать файл</div>
            </div>
            <ListFiles/>
        </div>
    )
}