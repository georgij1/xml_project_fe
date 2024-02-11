export const GetWordFile_1 = (
    selected: any,
    setContentFile: any,
    setIsLoading: any,
    deploy_api: any,
    port_server: any,
    test_api: any,
    setOpen: any
) => {
    selected.map((id: any) => {
        setOpen(true)
        fetch(deploy_api+port_server+`/file/read/${localStorage.getItem('NameCompany')}/${id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setContentFile(data)
                setIsLoading(false)
            })
            .catch((error) => console.log(error))
    })
}