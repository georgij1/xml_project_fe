export const UpdateDataXMLTable = (
    idFile: any,
    NameTable: any,
    deploy_api: any,
    port_server: any,
    test_api: any
) => {
    let body = {
        id_file: idFile,
        name_table: NameTable
    }

    fetch(deploy_api+port_server+`/file/update_data_xml_table`, {
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
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.error(error);
        });
}