import "./ListFiles.css";
import React, {useEffect, useState} from "react";
import {Logout} from "../../message/Logout";

export const ListFiles = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let body = {
        "NameCompany":localStorage.getItem('NameCompany')
    }

    const [files, setFiles] = useState([])

    const [foundFile, setFoundFile] = useState<boolean>(false)

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
                    if (e[0].image_name !== "Not found file") {
                        setFiles(e)
                        setFoundFile(true)
                    }
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }, [body])

    if (localStorage.getItem('theme')) {
        document.body.classList.add('dark_theme_body')
        return (
            <>
                <Logout/>
                {
                    foundFile ? <>
                         <div className="pt-24">
                             <div className="flex items-center m-5 gap-x-10">
                                 <div className="shadow-lg border-cyan-500/50 border-2 shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none">Выбрать</div>
                                 <input type="time" className="border-cyan-500/50 border-2 bg-black shadow-lg shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none"/>
                                 <input placeholder="Введите название файла..." className="border-cyan-500/50 border-2 bg-black shadow-lg shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none"/>
                             </div>
                             <table className="md:table-fixed">
                                 <thead>
                             <tr className="bg-slate-500">
                                     <th className="hover:bg-cyan-500 cursor-pointer">Имя</th>
                                     <th className="hover:bg-cyan-500 cursor-pointer">Время</th>
                                     <th className="hover:bg-cyan-500 cursor-pointer">Автор</th>
                                     <th className="hover:bg-cyan-500 cursor-pointer">Компания</th>
                                 </tr>
                             </thead>
                                 <tbody>
                                 {files.map(file => (
                                        <tr className="bg-sate-300 shadow-slate-100 not_active cursor-pointer"
                                            onClick={(event) => {
                                                // @ts-ignore
                                                // eslint-disable-next-line no-useless-concat
                                                window.open("http://localhost:8080/file/download/" + `${localStorage.getItem('NameCompany')}` + "/" + `${event.currentTarget.querySelector('td').textContent}`)
                                            }}>
                                             <td key={file["id"]}>{file["image_name"]}</td>
                                             <td key={file["id"]}>{file["time_stamp"]}</td>
                                             <td key={file["id"]}>{file["author"]}</td>
                                             <td key={file["id"]}>{file["name_company"]}</td>
                                         </tr>))}
                                </tbody>
                             </table>
                        </div>
                    </> : <>
                        <div className="pt-24 h-screen inline-flex flex-col justify-center m-auto w-full items-center">
                            <div className="text-center">Нет данных</div>
                        </div>
                    </>
                }
            </>
        )
    }

    else {
        return (
            <>
                <Logout/>
                {
                    foundFile ? <>
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
                    </> : <>
                        <div className="pt-24 h-screen inline-flex flex-col justify-center m-auto w-full items-center">
                            <div className="text-center">Нет данных</div>
                        </div>
                    </>
                }
            </>
        )
    }
}