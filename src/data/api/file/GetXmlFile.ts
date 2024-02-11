export const GetXmlFile = (
    setOpenXMLFile: any,
    selected: any,
    setContentFile: any,
    setIsLoading: any,
    deploy_api: any,
    port_server: any,
    Arr_count_tables_xml_settings: any,
    test_api: any,
    numTables: any,
    numSettings: any,
    setArr_count_tables_xml: any,
    setArr_count_tables_xml_settings: any,
    setIsLoadingXMLTables: any
) => {
    setOpenXMLFile(true)
    selected.map((id:any) => {
        fetch(test_api+port_server+`/file/read/XML/${localStorage.getItem('NameCompany')}/${id}`, {
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
            console.log(data)
            setContentFile(data)
            setIsLoading(false)
            for (let i = 1; i <= data[0]["count_tables"]; i++) {
                numTables.push(i)
            }
            numTables.map((item:any) => {
                for (let i = 1; i <= data[0]["tables"]["table_"+item]["settings_length"]; i++) {
                    numSettings.push(i)
                }
            })
            setArr_count_tables_xml(numTables)
            setArr_count_tables_xml_settings(numSettings)
            setIsLoadingXMLTables(false)

            console.log(Arr_count_tables_xml_settings)
        })
        .catch((error) => console.log(error))
    })
}