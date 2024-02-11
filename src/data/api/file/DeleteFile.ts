export const DeleteFile = (
	deploy_api: any,
    port_server: any,
    test_api: any,
    selected: any
) => {
	selected.map((select: any) => {
        fetch(deploy_api+port_server+`/file/delete/file/${localStorage.getItem('NameCompany')}/${select}`, {
            method: 'DELETE',
            headers: {
                "Accept": "*/*",
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache'
            }
        })
        .then((resp) => {
            if (typeof resp.status === "string") {
                if (resp.status === "200") {
                    window.location.reload()
                }
            }

            else if (typeof resp.status === "number") {
                if (resp.status === 200) {
                    window.location.reload()
                }
            }

            else {
                alert("Возможно произошло изменение на сервире и фронт его пока ещё не подтянул")
            }
        })
        .catch((error) => {
            console.log(error)
        })
    })
}