import "./ListFiles.css";
import React, {useEffect, useState} from "react";

export const ListFiles: React.FunctionComponent = () => {
    const body = {
        "NameCompany": localStorage.getItem('NameCompany'),
    }

    const [files, setFiles] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/company/files/list/get`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache'
            },
            mode: "cors"
        })
            .then((resp) => {
                resp.json().then((event) => {
                    setFiles(event)
                    // (Object.keys(event) as (keyof typeof event)[]).forEach((key, index) => {
                    //     console.log(key)
                    //     setFiles(event[key])
                    //
                    //     // content_tbody=`
                    //     //     <tr class="bg-slate-200 shadow-slate-100 not_active">
                    //     //       <td>${(event[key].id_image)}</td>
                    //     //       <td>${(event[key].image_name)}</td>
                    //     //       <td>${(event[key].type)}</td>
                    //     //       <td>${(event[key].data)}</td>
                    //     //       <td>${(event[key].time_stamp)}</td>
                    //     //       <td>${(event[key].name_company)}</td>
                    //     //     </tr>
                    //     // `
                    //
                    //     // @ts-ignore
                    //     for (let i of document.querySelectorAll('.not_active')) {
                    //         i.addEventListener('click', () => {
                    //             localStorage.setItem('id_image', event[key].id_image)
                    //             localStorage.setItem('image_name', event[key].image_name)
                    //             localStorage.setItem('type', event[key].type)
                    //             localStorage.setItem('data', event[key].data)
                    //             localStorage.setItem('time_stamp', event[key].time_stamp)
                    //             localStorage.setItem('name_company', event[key].name_company)
                    //
                    //             window.open(`/home/company/look/file`, '_self')
                    //         })
                    //     }
                    // });
                })
            })
    }, [])

    console.log(files)

    return (
        <div>
            <table className="md:table-fixed">
                <thead>
                <tr className="bg-slate-500">
                    <th>id_image</th>
                    <th>image_name</th>
                    <th>type</th>
                    <th>data</th>
                    <th>time_stamp</th>
                    <th>name_company</th>
                </tr>
                </thead>
                <tbody>
                    {
                        files.map(file => (
                            <tr className="bg-slate-200 shadow-slate-100 not_active" onClick={() => {
                                localStorage.setItem('id_image', file["id_image"])
                                localStorage.setItem('image_name', file["image_name"])
                                localStorage.setItem('type', file["type"])
                                localStorage.setItem('data', file["data"])
                                localStorage.setItem('time_stamp', file["time_stamp"])
                                localStorage.setItem('name_company', file["name_company"])
                                window.open(`/home/company/look/file`, '_self')
                            }}>
                                <td key={file["id"]}>{file["id_image"]}</td>
                                <td key={file["id"]}>{file["image_name"]}</td>
                                <td key={file["id"]}>{file["type"]}</td>
                                <td key={file["id"]}>{file["data"]}</td>
                                <td key={file["id"]}>{file["time_stamp"]}</td>
                                <td key={file["id"]}>{file["name_company"]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}