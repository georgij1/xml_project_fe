export const GetPdfFile = (
    setOpenPDFFile: any,
    selected: any,
    setContentFile: any,
    setIsLoading: any,
    deploy_api: any,
    port_server: any,
    test_api: any
) => {
    setOpenPDFFile(true)
    selected.map((id:any) => {
        fetch(deploy_api+port_server+`/file/read/PDF/${localStorage.getItem('NameCompany')}/${id}`, {
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