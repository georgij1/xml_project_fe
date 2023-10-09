import React from "react";

export const ReadFile: React.FunctionComponent = () => {
    const body = {
        "NameFileUnique": localStorage.getItem('id_image')
    }

    const url = "http://localhost:8080/api/company/file/read";

    fetch(`${url}`, {
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
            if (resp.status === 200) {
                resp.text().then((event) => {
                    console.log(event)
                //     @ts-ignore
                    document.querySelector('.content_file').innerHTML=`${event}`
                })
            }

            else {
                alert('Ошибка. Код ошибки: ' + resp.status)
            }
        })
        .catch((error) => {
            console.log(error)
        })

    return (
        <div>
            <h1>ReadFile</h1>
            <div>{localStorage.getItem('id_image')}</div>
            <div>{localStorage.getItem('image_name')}</div>
            <div>{localStorage.getItem('type')}</div>
            <div>{localStorage.getItem('data')}</div>
            <div>{localStorage.getItem('time_stamp')}</div>
            <div>{localStorage.getItem('name_company')}</div>
            <div>Содержание файла: <div className="content_file"></div></div>
        </div>
    )
}