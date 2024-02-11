export const click_card_table_xml = (
    event: React.MouseEvent<HTMLElement>,
    setDataCellTable: any,
    numValues: any,
    numColumns: any,
    setArr_count_columns_xml: any,
    numHead: any,
    setArr_count_head_xml: any,
    setClickCardData: any,
    setVisiualCard: any,
    port_server: any,
    test_api: any,
    selected: any
) => {
        const element = event.currentTarget;
        if (element !== null) {
            const e = element.querySelector('.MuiTypography-h5');
            if (e !== null) {
                selected.map((id:any) => {
                    fetch(test_api+port_server+`/file/xml/tables/${e.textContent}/${localStorage.getItem('NameCompany')}/${id}`, {
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
                            setVisiualCard(false)
                            setClickCardData(data)
                            console.log(data)
                            for (let i = 1; i <= data[0]["count_column_table"]; i++) {
                                numHead.push(i)
                            }
                            setArr_count_head_xml(numHead)
                            for (let i = 0; i < data[0]["value_columns"][1]; i++) {
                                numColumns.push(i)
                            }
                            setArr_count_columns_xml(numColumns)
                            for (let i = 0; i < data[0]["value_columns"][1]; i++) {
                                numValues.push(i)
                            }
                            setDataCellTable([])
                        })
                        .catch((error) => console.log(error))
                })
            }
            else {
                console.log('e is null')
            }
        }
        else {
            console.log('element is null')
        }
    }