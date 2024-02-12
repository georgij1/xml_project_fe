import { 
    Box,
    Typography,
    IconButton,
    Button
} from "@mui/material"
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled, useTheme  } from '@mui/material/styles';
import React from "react";
import CssBaseline from '@mui/material/CssBaseline';

interface PropsEditScreen {
    ComponentTableName: any;
    ComponentTableName_1: any;
    setComponentTableName: any;
    click_card_data: any;
    arr_count_columns_xml: any;
    setComponentTableName_1: any;
    arr_count_head_xml: any;
    contentFile: any;
    open: any;
}

export const EditScreen = (
    {
        ComponentTableName,
        ComponentTableName_1,
        setComponentTableName,
        click_card_data,
        arr_count_columns_xml,
        setComponentTableName_1,
        arr_count_head_xml,
        contentFile,
        open
    }: PropsEditScreen
) => {
    console.log(ComponentTableName)

    const drawerWidth = 240;

    const Main = styled('main', { shouldForwardProp: (prop: any) => prop !== 'open' })<{
      open?: boolean;
    }>(({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const theme = useTheme();
    const [open_2, setOpen_2] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen_2(true);
    };

    const handleDrawerClose = () => {
        setOpen_2(false);
    };

    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

        &:hover {
          border-color: ${blue[400]};
        }

        &:focus {
          outline: 0;
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }

        // firefox
        &:focus-visible {
          outline: 0;
        }
        `,
    );

    return (
        <Box sx={{ minHeight: 'max-content', flexGrow: 1, maxWidth: '100%' }}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Button sx={{
                    "position": "absolute",
                    "top": "82px",
                    "left": "122px"
                }} onClick={handleDrawerOpen} variant="contained">Перевыбрать колонку</Button>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={open_2}
                >
                    <DrawerHeader sx={{"margin-top": "57px"}}>
                      <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                      </IconButton>
                    </DrawerHeader>
                    <List>
                        <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        >
                            <TreeItem nodeId="5" label={contentFile.map((item: any) => (<Box key={item.id}>{item["name_file"]}</Box>))}>
                                <TreeItem nodeId="6" label={click_card_data.map((item:any) => (<Box key={item.id}>{item["table"]["TableName"]}</Box>))}>
                                    {click_card_data.map((item:any) => (
                                        <>
                                            {arr_count_head_xml.map((item_1: any) => (
                                                <TreeItem nodeId={item_1+6} onClick={(event) => {
                                                    console.log(event.currentTarget.textContent)
                                                    setComponentTableName_1([event.currentTarget.textContent === null ? "" : event.currentTarget.textContent])
                                                    if (event.currentTarget.textContent !== null) {
                                                        {arr_count_columns_xml.map((row:any) => {
                                                            console.log(row)
                                                            {click_card_data.map((item:any) => {
                                                                if (event.currentTarget.textContent === "OrgFullName") {
                                                                    setComponentTableName(item["value_columns"][0]["name_"+row+"_org_full_name_value"])
                                                                }

                                                                else if (event.currentTarget.textContent === "OrgOGRN") {
                                                                    setComponentTableName(item["value_columns"][0]["name_"+row+"_org_ogrn_value"])
                                                                }

                                                                else if (event.currentTarget.textContent === "OrgINN") {
                                                                    setComponentTableName(item["value_columns"][0]["name_"+row+"_org_inn_value"])
                                                                }

                                                                else if (event.currentTarget.textContent === "OrgKPP") {
                                                                    setComponentTableName(item["value_columns"][0]["name_"+row+"_org_kpp_value"])
                                                                }

                                                                else if (event.currentTarget.textContent === "Region") {
                                                                    setComponentTableName(item["value_columns"][0]["name_"+row+"_region_value"])
                                                                }
                                                                
                                                                else if (event.currentTarget.textContent === "City") {
                                                                    setComponentTableName(item["value_columns"][0]["name_"+row+"_city_value"])
                                                                }
                                                                
                                                                else if (event.currentTarget.textContent === "Street") {
                                                                    setComponentTableName(item["value_columns"][0]["name_"+row+"_street_value"])
                                                                }
                                                                
                                                                else if (event.currentTarget.textContent === "Building") {
                                                                    setComponentTableName(item["value_columns"][0]["name_"+row+"_building_value"])
                                                                }
                                                                
                                                                else if (event.currentTarget.textContent === "Room") {
                                                                    setComponentTableName(item["value_columns"][0]["name_"+row+"_room_value"])
                                                                }
                                                            })}
                                                        })}
                                                    }
                                                }} label={item["table"]["columns"]["column_"+item_1]["name"] !== "IdTransaction" ? item["table"]["columns"]["column_"+item_1]["name"] : ""}/>
                                            ))}
                                        </>
                                    ))}
                                </TreeItem>
                            </TreeItem>
                        </TreeView>
                    </List>
                </Drawer>
                <Main open={open_2} sx={{marginLeft: "-25px"}}>
                    <Typography variant="h4">{ComponentTableName_1}</Typography>
                    <Textarea sx={{
                        marginTop: "10px",
                        width: "100%"
                    }} aria-label="empty textarea" placeholder="Empty" defaultValue={ComponentTableName}/>
                </Main>
            </Box>
        </Box>
    );
}