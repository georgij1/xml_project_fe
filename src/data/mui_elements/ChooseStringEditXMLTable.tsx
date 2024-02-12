import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { SnackbarProvider } from 'notistack';
import { Typography } from "@mui/material";

interface PropsChooseStringEditXMLTable {
    data: any;
    setCloseListItemTables: any;
    setShowSuccessMessage: any;
    setShowErrorMessage: any;
    arr_count_columns_xml: any;
    ShowErrorMessage: any;
    contentFile: any;
    arr_count_head_xml: any;
    setComponentTableName_1: any;
    click_card_data: any;
    setComponentTableName: any;
    ErrorMessage: any;
    ComponentTableName_1: any;
    ComponentTableName: any;
    ShowSuccessMessage: any;
    SuccessMessage: any;
    CloseListItemTables: any;
    open: any;
}

export const ChooseStringEditXMLTable = (
    {
        data,
        setCloseListItemTables,
        setShowSuccessMessage,
        setShowErrorMessage,
        arr_count_columns_xml,
        ShowErrorMessage,
        contentFile,
        arr_count_head_xml,
        setComponentTableName_1,
        click_card_data,
        setComponentTableName,
        ErrorMessage,
        ComponentTableName_1,
        ComponentTableName,
        ShowSuccessMessage,
        SuccessMessage,
        CloseListItemTables,
        open
    }: PropsChooseStringEditXMLTable
) => {
    const choose_string = (props: any) => {
        console.log(props)

        setCloseListItemTables(true)

        if (props.indexOf('id_transaction') !== -1) {
            console.log('only read')
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }

        else {
            console.log('you can edit')
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
        }
    }

    if (data === 0) {
        return (
            <>
                {arr_count_columns_xml.map((row:any) => (
                    <>
                        <List
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                         aria-label="contacts"
                         >
                             {click_card_data.map((item:any) => (
                                <>
                                {
                                    CloseListItemTables ? <>
                                        
                                    </> : <>
                                        <ListItem disablePadding onClick={() => {
                                        choose_string("org_full_name_value: "+item["value_columns"][0]["name_"+row+"_org_full_name_value"])
                                         setComponentTableName([])
                                         setComponentTableName_1([])
                                         setComponentTableName_1(["org_full_name_value"])
                                         setComponentTableName(item["value_columns"][0]["name_"+row+"_org_full_name_value"])
                                     }}>
                                         <ListItemButton>
                                                 <Typography>org_full_name_value: </Typography>
                                                 <ListItemText primary={item["value_columns"][0]["name_"+row+"_org_full_name_value"]} />
                                         </ListItemButton>
                                     </ListItem>
                                     <ListItem disablePadding onClick={() => {
                                         choose_string("org_ogrn_value: "+item["value_columns"][0]["name_"+row+"_org_ogrn_value"])
                                         setComponentTableName([])
                                         setComponentTableName_1([])
                                         setComponentTableName_1(["org_ogrn_value"])
                                         setComponentTableName(item["value_columns"][0]["name_"+row+"_org_ogrn_value"])
                                     }}>
                                         <ListItemButton>
                                             <Typography>org_ogrn_value: </Typography>
                                             <ListItemText primary={item["value_columns"][0]["name_"+row+"_org_ogrn_value"]} />
                                         </ListItemButton>
                                     </ListItem>
                                     <ListItem disablePadding onClick={() => {
                                         choose_string("org_inn_value: "+item["value_columns"][0]["name_"+row+"_org_inn_value"])
                                         setComponentTableName([])
                                         setComponentTableName_1([])
                                         setComponentTableName_1(["org_inn_value"])
                                         setComponentTableName(item["value_columns"][0]["name_"+row+"_org_inn_value"])
                                     }}>
                                         <ListItemButton>
                                             <Typography>org_inn_value: </Typography>
                                             <ListItemText primary={item["value_columns"][0]["name_"+row+"_org_inn_value"]} />
                                         </ListItemButton>
                                     </ListItem>
                                     <ListItem disablePadding onClick={() => {
                                         choose_string("org_kpp_value: "+item["value_columns"][0]["name_"+row+"_org_kpp_value"])
                                         setComponentTableName([])
                                         setComponentTableName_1([])
                                         setComponentTableName_1(["org_kpp_value"])
                                         setComponentTableName(item["value_columns"][0]["name_"+row+"_org_kpp_value"])
                                     }}>
                                         <ListItemButton>
                                             <Typography>org_kpp_value: </Typography>
                                             <ListItemText primary={item["value_columns"][0]["name_"+row+"_org_kpp_value"]} />
                                         </ListItemButton>
                                     </ListItem>
                                     <ListItem disablePadding onClick={() => {
                                         choose_string("region_value: "+item["value_columns"][0]["name_"+row+"_region_value"])
                                         setComponentTableName([])
                                         setComponentTableName_1([])
                                         setComponentTableName_1(["region_value"])
                                         setComponentTableName(item["value_columns"][0]["name_"+row+"_region_value"])
                                     }}>
                                         <ListItemButton>
                                             <Typography>region_value: </Typography>
                                             <ListItemText primary={item["value_columns"][0]["name_"+row+"_region_value"]} />
                                         </ListItemButton>
                                     </ListItem>
                                     <ListItem disablePadding onClick={() => {
                                         choose_string("city_value: "+item["value_columns"][0]["name_"+row+"_org_full_name_value"])
                                         setComponentTableName([])
                                         setComponentTableName_1([])
                                         setComponentTableName_1(["city_value"])
                                         setComponentTableName(item["value_columns"][0]["name_"+row+"_org_full_name_value"])
                                     }}>
                                         <ListItemButton>
                                             <Typography>city_value: </Typography>
                                             <ListItemText primary={item["value_columns"][0]["name_"+row+"_city_value"]} />
                                         </ListItemButton>
                                     </ListItem>
                                     <ListItem disablePadding onClick={() => {
                                         choose_string("street_value: "+item["value_columns"][0]["name_"+row+"_street_value"])
                                         setComponentTableName([])
                                         setComponentTableName_1([])
                                         setComponentTableName_1(["street_value"])
                                         setComponentTableName(item["value_columns"][0]["name_"+row+"_street_value"])
                                     }}>
                                         <ListItemButton>
                                             <Typography>street_value: </Typography>
                                             <ListItemText primary={item["value_columns"][0]["name_"+row+"_street_value"]} />
                                         </ListItemButton>
                                     </ListItem>
                                     <ListItem disablePadding onClick={() => {
                                         choose_string("building_value: "+item["value_columns"][0]["name_"+row+"_building_value"])
                                         setComponentTableName([])
                                         setComponentTableName_1([])
                                         setComponentTableName_1(["building_value"])
                                         setComponentTableName(item["value_columns"][0]["name_"+row+"_building_value"])

                                     }}>
                                         <ListItemButton>
                                             <Typography>building_value: </Typography>
                                             <ListItemText primary={item["value_columns"][0]["name_"+row+"_building_value"]} />
                                         </ListItemButton>
                                     </ListItem>
                                     <ListItem disablePadding onClick={() => {
                                         choose_string("room_value: "+item["value_columns"][0]["name_"+row+"_room_value"])
                                         setComponentTableName([])
                                         setComponentTableName_1([])
                                         setComponentTableName_1(["room_value"])
                                         setComponentTableName(item["value_columns"][0]["name_"+row+"_room_value"])
                                     }}>
                                         <ListItemButton>
                                             <Typography>room_value: </Typography>
                                             <ListItemText primary={item["value_columns"][0]["name_"+row+"_room_value"]} />
                                         </ListItemButton>
                                     </ListItem>
                                     <ListItem disablePadding onClick={() => {
                                         choose_string("id_transaction: "+item["value_columns"][0]["name_"+row+"_id_transaction"])
                                         setComponentTableName([])
                                         setComponentTableName_1([])
                                         setComponentTableName_1(["id_transaction"])
                                         setComponentTableName(item["value_columns"][0]["name_"+row+"_id_transaction"])
                                     }}>
                                         <ListItemButton>
                                             <Typography>id_transaction: </Typography>
                                             <ListItemText primary={item["value_columns"][0]["name_"+row+"_id_transaction"]} />
                                         </ListItemButton>
                                     </ListItem>
                                    </>
                                }
                                    
                                 </>           
                             ))}
                         </List>
                         <>
                            {
                                ShowSuccessMessage ? 
                                    <SnackbarProvider maxSnack={3}>
                                        <SuccessMessage data={"Сохранено"} 
                                            ComponentTableName={ComponentTableName}
                                            ComponentTableName_1={ComponentTableName_1}
                                            setComponentTableName={setComponentTableName}
                                            click_card_data={click_card_data}
                                            arr_count_columns_xml={arr_count_columns_xml}
                                            setComponentTableName_1={setComponentTableName_1}
                                            arr_count_head_xml={arr_count_head_xml}
                                            contentFile={contentFile} open={open}
                                        />
                                    </SnackbarProvider>
                                : <></>
                            } 
                        </>
                        <>
                            {
                                ShowErrorMessage ? <>
                                    <SnackbarProvider maxSnack={3}>
                                        <ErrorMessage data={"Это поле не достпно для редактирования или соханения"}/>
                                    </SnackbarProvider>
                                </> : <></>
                            }
                        </>
                    </>
                ))}
            </>
        )
    }

    else if (data === 1) {
        return (
            <>
                <>Выбирите, пожалуйст, способ с помощью, 
                котрого будет происходить редактирование 
                (автоматическое из файл или ручное)</>
                <List
                      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                      aria-label="contacts"
                >
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Автоматическое" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Выбор из файла" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </>
        )
    }

    else if (data === 2) {
        return (<>Не забудьте сохранить при нажатии на зелённую галочку</>)
    }

    else {
        return (<>Напишите в поддержку</>)
    }
}