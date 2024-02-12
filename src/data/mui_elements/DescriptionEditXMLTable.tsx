import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface DescriptionEditXMLTableProps {
    data: any,
    arr_count_columns_xml: any,
    click_card_data: any
}

export const DescriptionEditXMLTable = (
    {
        data,
        arr_count_columns_xml,
        click_card_data
    }: DescriptionEditXMLTableProps
) => {
    if (data === 0) {
        return (
            <>
                <Typography>Выбирите, пожалуйста, строку из списка, которую будуте редактировать</Typography>
                {arr_count_columns_xml.map((row:any) => (
                    <List
                      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                      aria-label="contacts"
                    >
                        {click_card_data.map((item:any) => (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={item["value_columns"][0]["name_"+row+"_org_full_name_value"]} />
                                    </ListItemButton>
                                </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={item["value_columns"][0]["name_"+row+"_org_ogrn_value"]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={item["value_columns"][0]["name_"+row+"_org_inn_value"]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={item["value_columns"][0]["name_"+row+"_org_kpp_value"]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={item["value_columns"][0]["name_"+row+"_region_value"]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={item["value_columns"][0]["name_"+row+"_city_value"]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={item["value_columns"][0]["name_"+row+"_street_value"]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={item["value_columns"][0]["name_"+row+"_building_value"]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={item["value_columns"][0]["name_"+row+"_room_value"]} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={item["value_columns"][0]["name_"+row+"_id_transaction"]} />
                                        </ListItemButton>
                                    </ListItem>
                                </>           
                        ))}
                    </List>
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