import "./ListFiles.css";
import React, {useEffect, useState} from "react";
import {Logout} from "../../message/Logout";

export const ListFiles = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let body = {
        "NameCompany":localStorage.getItem('NameCompany')
    }

    const [files, setFiles] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/file/list`, {
            method: 'POST',
            // @ts-ignore
            body: JSON.stringify(body),
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache'
            }
        })
            .then((resp) => {
                resp.json().then(e => {
                    // setFiles(e)
                    console.log(e)
                    setFiles(e)
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div className="pt-24">
            <Logout/>
            <div className="flex items-center m-5 gap-x-10">
                <div className="border-2 border-bisque; shadow-lg shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none">Выбрать</div>
                <input type="time" className="shadow-lg shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none"/>
                <input placeholder="Введите название файла..." className="shadow-lg shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none"/>
            </div>
            <table className="md:table-fixed">
                <thead>
                <tr className="bg-slate-500">
                    <th className="hover:bg-white cursor-pointer">Имя</th>
                    <th className="hover:bg-white cursor-pointer">Время</th>
                    <th className="hover:bg-white cursor-pointer">Автор</th>
                    <th className="hover:bg-white cursor-pointer">Компания</th>
                </tr>
                </thead>
                <tbody>
                {/*@ts-ignore*/}
                    {
                        files.map(file => (
                            <tr className="bg-slate-200 shadow-slate-100 not_active" onClick={(event) => {
                                // @ts-ignore
                                // eslint-disable-next-line no-useless-concat
                                window.open("http://localhost:8080/file/download/"+`${localStorage.getItem('NameCompany')}`+"/"+`${event.currentTarget.querySelector('td').textContent}`)
                            }}>
                                <td key={file["id"]}>{file["image_name"]}</td>
                                <td key={file["id"]}>{file["time_stamp"]}</td>
                                <td key={file["id"]}>{file["author"]}</td>
                                <td key={file["id"]}>{file["name_company"]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}