import "./ListFiles.css";
import React, {Fragment, useEffect, useState} from "react";
import {Logout} from "../../message/Logout";
import {
    Alert,
    alpha,
    AppBar,
    Box,
    Card,
    CardActionArea,
    CardContent,
    Checkbox, 
    Fab, 
    IconButton, 
    Paper, 
    SpeedDial, 
    SpeedDialAction, 
    SpeedDialIcon, 
    Table, 
    TableBody,
    TableCell, 
    TableContainer,
    TableHead, 
    TablePagination,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    CloudUpload, 
    FolderZip, 
    NoteAdd, 
    OpenInBrowser,
    Close,
    Edit,
    Print,
    FileCopy,
    TableChart,
    Code,
    Add, 
    Delete
} from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, styled, useTheme  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { style } from "../../../data/objects/Style";
import { GetFileList } from "../../../data/api/file/GetFileList";
import { Data } from "../../../data/interface/DataTableFiles";
import { Order } from "../../../data/Type/TypeSortTable";
import { HeadCell } from "../../../data/interface/DataHeadCell";
import { deploy_api, port_server, test_api } from "../../../data/ServerVariable";
import { EnhancedTableToolbarProps } from "../../../data/interface/EnhancedTableToolbarProps";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import CircularProgress from '@mui/material/CircularProgress';
import Help from '@mui/icons-material/Help';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { rows } from "../../../data/objects/CreateDataTable";
import { steps } from "../../../data/objects/steps_array";
import { headCells } from "../../../data/objects/HeadCells";
import { numTables } from "../../../data/objects/numTables";
import { descendingComparator } from "../../../data/function/DescendingComparator";
import { getComparator } from "../../../data/function/GetComparator";
import { stableSort } from "../../../data/function/StableSort";
import { EnhancedTableHead } from "../../../data/function/EnhancedTableHead";
import { EnhancedTableProps } from "../../../data/interface/EnhancedTableProps";
import { options } from "../../../data/objects/EnhancedTableToolbarOptions";
import { numSettings } from "../../../data/objects/numSettings";
import { GetPdfFile } from "../../../data/api/file/GetPdfFile";
import { GetXmlFile } from "../../../data/api/file/GetXmlFile";
import { GetWordFile } from "../../../data/api/file/GetWordFile";
import { handleClick_start } from "../../../data/objects/handleClick";
import { handleMenuItemClick } from "../../../data/objects/handleMenuItemClick";
import { handleToggle } from "../../../data/objects/handleToggle";
import { handleRequestSort } from "../../../data/objects/handleRequestSort";
import { GetPacketDocumentZip } from "../../../data/api/file/GetPacketDocumentZip";
import { GetWordFile_1 } from "../../../data/api/file/GetWordFile_1";
import { DeleteArrayFiles } from "../../../data/api/file/DeleteArrayFiles";
import { DeleteFile } from "../../../data/api/file/DeleteFile";
import { ShowChoosedFileFiles } from "../../../data/mui_elements/ShowChoosedFileFiles";
import { NoBodyChoosedFile } from "../../../data/mui_elements/NoBodyChoosedFile";
import { CollectPacketDocument } from "../../../data/mui_elements/CollectPacketDocument";
import { handleClose } from "../../../data/objects/handleClose";
import { handleSelectAllClick } from "../../../data/objects/handleSelectAllClick";
import { DeleteButton } from "../../../data/mui_elements/DeleteButton";
import { CollectPacketArrayDocument } from "../../../data/mui_elements/CollectPacketArrayDocument";
import { OpenInBrowserMUI } from "../../../data/mui_elements/OpenInBrowser";
import { DeleteArrayFilesMUI } from "../../../data/mui_elements/DeleteArrayFiles";
import { MenuListTypeFiles } from "../../../data/mui_elements/MenuListTypeFiles";
import { ChoosedOneElement } from "../../../data/CustomsElements/ChoosedOneElement";
import { EnhancedTableToolbar } from "../../../data/CustomsElements/EnhancedTableToolbar";
import { handleClick } from "../../../data/objects/handleClick_1";
import { handleChangePage } from "../../../data/objects/handleChangePage_1";
import { handleChangeRowsPerPage } from "../../../data/objects/handleChangeRowsPerPage";
import { isSelected } from "../../../data/objects/IsSelected";
import { emptyRows } from "../../../data/objects/EmptyRows";
import { handleClosePDF } from "../../../data/objects/handleClosePDF";
import { handleCloseXMLFile } from "../../../data/objects/handleCloseXMLFile";
import { handleCloseWordFile } from "../../../data/objects/handleCloseWordFile";
import { handleAlignment } from "../../../data/objects/HandleAlignment";
import { 
    numColumns,
    numHead,
    numValues
} from "../../../data/objects/AllVariables";
import { watch_guide } from "../../../data/objects/watch_guide"
import { RowProps } from "../../../data/Type/RowProps"
import { click_card_table_xml } from "../../../data/api/file/click_card_table_xml"
import { StyleSettingsCell } from "../../../data/objects/StyleSettingsCell"
import { Settings_cell } from "../../../data/CustomsElements/Settings_cell"

export const ListFiles = () => {
    const [contentFile, setContentFile] = useState([]);
    const [arr_count_tables_xml, setArr_count_tables_xml]:any = React.useState([]);
    const [isLoadingXMLTables, setIsLoadingXMLTables]:any = React.useState<boolean>(true);
    const [Arr_count_tables_xml_settings, setArr_count_tables_xml_settings]:any = React.useState([]);
    const [files, setFiles] = useState([]);
    const [foundFile, setFoundFile] = useState<boolean>(false);
    const [isLoadingElementMain, setIsLoadingElementMain] = React.useState<boolean>(true);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('author');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [openPDFFile, setOpenPDFFile] = React.useState(false);
    const [openXMLFile, setOpenXMLFile] = React.useState(false);
    const [openWordFile, setOpenWordFile] = React.useState(false);
    const [OpenChooseString, setOpenChooseString] = React.useState(false);
    const [coppy, setCoppy] = React.useState(false);
    const [alignment, setAlignment] = React.useState<string | null>('left');
    const [visiualType, setVisiualType] = React.useState(true);
    const [visiulCard, setVisiualCard] = React.useState(true);
    const [click_card_data, setClickCardData] = React.useState([]);
    const [arr_count_columns_xml, setArr_count_columns_xml]:any = React.useState([]);
    const [arr_count_head_xml, setArr_count_head_xml]:any = React.useState([]);
    const [dataCellTable, setDataCellTable] = React.useState([{ value: 'Данных нет' }]);
    const [watchGuide, setWatchGuide] = React.useState(false);

    useEffect(() => {
        GetFileList(setFiles, setFoundFile, setIsLoadingElementMain)
    }, [])

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: ' + localStorage.getItem("dark_theme") + ')');

    const theme = React.useMemo(
        () =>
          createTheme({
            palette: {
              mode: prefersDarkMode ? 'dark' : 'light',
            },
          }),
        [prefersDarkMode],
    );

    const actions = [
        { icon: <FileCopy />, name: 'Скопировать' },
        { icon: <Print />, name: 'Печать' }
    ];

    const Parent = (props:any) => {
        return (
            <>
                <Child data={props} />
            </>
        );
    }

    const Child = (props:any) => {
        const { data } = props;

        if (data["data"] === "Approver") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "ExpertOrganization") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "Documents") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "PreviousConclusions") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "PreviousSimpleConclusions") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "Object") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "Declarant") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "ProjectDocumentsDeveloper") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "Finance") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "ClimateConditions") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "ClimateConditionsNote") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "CadastralNumber") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "ExpertProjectDocuments") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "Experts") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "Designer") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else if (data["data"] === "Summary") {
            return (
                <>
                    {dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </>
            );
        }

        else return(<>Произошла ошибка</>);
    }

    const DescriptionEditXMLTable = (props: any) => {
        const { data } = props

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

    let formData = new FormData()


    const send_update_data_server = () => {
        console.log('get data')
        let main_doc:any = document.querySelector('main')
        if (main_doc !== null) {
            let Textarea:any = main_doc.querySelector('textarea')
            let h4:any = main_doc.querySelector('h4')
            let h4Content:any = h4.textContent
            formData.append('h4', h4Content)
            let TextareaContent:any = Textarea.textContent
            formData.append('Textarea', TextareaContent)
            console.log(formData.get("Textarea"))
            console.log(formData.get("h4"))
            console.log(formData)
        }
    }

    const SuccessMessage = (props: any) => {
        const { data } = props
        const { enqueueSnackbar } = useSnackbar();

        const handleClickVariant = (variant: VariantType) => () => {
            enqueueSnackbar(data, { variant });
            send_update_data_server()
        };

        return (
            <React.Fragment>
                <EditScreen/>
                <Button onClick={
                    handleClickVariant('success')
                } variant="contained" color="success">Сохранить</Button>
            </React.Fragment>
        );
    }

    const ErrorMessage = (props: any) => {
        console.log(props)
        const { data } = props
        const { enqueueSnackbar } = useSnackbar();

        const handleClickVariant = (variant: VariantType) => () => {
            enqueueSnackbar(data, { variant });
        };

        return (
            <React.Fragment>
                <Button onClick={handleClickVariant('error')} variant="outlined" color="error">Сохранить</Button>
            </React.Fragment>
        );
    }

    const [ShowSuccessMessage, setShowSuccessMessage] = React.useState(false)
    const [ShowErrorMessage, setShowErrorMessage] = React.useState(false)
    const [ComponentTableName, setComponentTableName] = React.useState([])
    const [ComponentTableName_1, setComponentTableName_1] = React.useState([""])
    const [CloseListItemTables, setCloseListItemTables] = React.useState(false)

    const ChooseStringEditXMLTable = (props: any) => {
        const { data } = props

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
                                     ShowSuccessMessage ? <>
                                        <SnackbarProvider maxSnack={3}>
                                            <SuccessMessage data={"Сохранено"}/>
                                        </SnackbarProvider>
                                    </> : <></>
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

    const Row: React.FC<RowProps> = ({ item }) => {
        if (item["table"]["TableName"] === 'ExpertOrganization') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} className="table_row" sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_full_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_ogrn_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_inn_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_kpp_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_region_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_city_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_street_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_building_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_room_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'Approver') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_family_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_first_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_second_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_position_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'ExaminationObject') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_full_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_ogrn_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_inn_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_kpp_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_region_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_city_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_street_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_building_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_room_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                      ))}
                </React.Fragment>
              );
        }
        
        else if (item["table"]["TableName"] === 'Documents') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_document_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_doc_type_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_doc_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_doc_number_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_doc_date_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_doc_issue_author_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_file_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_file_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_file_format_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_file_checksum_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_file_name_1_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_file_format_1_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_file_checksum_1_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
              );
        }
        
        else if (item["table"]["TableName"] === 'PreviousConclusions') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_previous_conclusion_value"]}
                            </TableCell>

                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_date_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_number_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_egrz_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_examination_object_type_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_result_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'PreviousSimpleConclusions') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_previous_simple_conclusion_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_date_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_number_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_result_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'Object') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_type_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_functions_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_country_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_region_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_city_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_note_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_tei_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_tei_measure_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_tei_value_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'Declarant') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_organization_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_full_name_value"]}
                            </TableCell>

                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_ogrn_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_inn_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_kpp_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_region_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_city_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_street_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_building_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_room_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'ProjectDocumentsDeveloper') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_organization_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_full_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_ogrn_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_inn_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_org_kpp_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_region_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_city_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_street_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_building_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_room_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'Finance') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_finance_type"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_finance_size"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                      ))}
                </React.Fragment>
              );
        }
        
        else if (item["table"]["TableName"] === 'ClimateConditions') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_climate_district_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_geological_conditions_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_seismic_activity_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_snow_district_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_wind_district_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                      ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'ClimateConditionsNote') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_climate_conditions_note_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'CadastralNumber') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_cadastral_number_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'ExpertProjectDocuments') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_project_documents_review"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'Experts') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_expert_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_family_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_first_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_second_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_expert_type_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_expert_certificate_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_expert_certificate_begindate_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_expert_certificate_end_date_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }
        
        else if (item["table"]["TableName"] === 'Designer') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_building_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_city_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_country_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_family_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_first_name_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_ip_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_ogrnip_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_post_address_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_post_index_value"]}
                            </TableCell>                                      
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_region_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_room_value"]}
                            </TableCell>                                      
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_second_name_value"]}
                            </TableCell>                                      
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_street_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }

        else if (item["table"]["TableName"] === 'Summary') {
            return (
                <React.Fragment>
                    {arr_count_columns_xml.map((row:any) => (
                        <TableRow key={row} sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_engineering_survey_type_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_examination_summary_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_project_documents_summary_date_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_project_documents_summary_value"]}
                            </TableCell>
                            <TableCell>
                                {item["value_columns"][0]["name_"+row+"_id_transaction"]}
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            );
        }

        else {
            return (
                <TableRow sx={{ '& > *': { borderBottom: 'unset' }, paddingTop: '10px' }}>
                    <TableCell>null</TableCell>
                </TableRow>
            );
        }
    };

    const EditScreen = () => {
        console.log(ComponentTableName)

        const drawerWidth = 240;

        const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
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

    const Accordion = styled((props: AccordionProps) => {
        return <MuiAccordion disableGutters elevation={0} square {...props} />
    })(({ theme }) => ({
      border: `1px solid ${theme.palette.divider}`,
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&::before': {
        display: 'none',
      },
    }));

    const AccordionSummary = styled((props: AccordionSummaryProps) => (
      <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
      />
    ))(({ theme }) => ({
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, .05)'
          : 'rgba(0, 0, 0, .03)',
      flexDirection: 'row-reverse',
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
      },
      '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
      },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
      padding: theme.spacing(2),
      borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const action_click = (action:any) => {
        if (action.name === "Печать") {
            let printwin = window.open("");
            if (printwin) {
                let elements = document.getElementsByClassName("textWord");
                if (elements.length > 0) {
                    for (let element of Array.from(elements)) {
                        const text = element.textContent;
                        if (text !== null) {
                            printwin.document.write(text);
                        }
                    }

                    printwin.stop();
                    printwin.print();
                    printwin.close();
                }
            }
        }

        else if (action.name === "Скопировать") {
            let elements = document.getElementsByClassName("textWord");
            let text = Array.from(elements).map(element => element.textContent).join(" ");
            navigator.clipboard.writeText(text);
            setCoppy(true)
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);
    
    const [completed, setCompleted] = React.useState<{[k: number]: boolean;}>({});
    
    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    
    return (
        <>
            {
                isLoadingElementMain ? <>
                    <Box sx={{
                    position: 'absolute',
                    left: '50vW',
                    top: '50vh'
                    }}>
                       <CircularProgress /> 
                    </Box>
                </> : <>
                    <Box sx={{ width: '100%', boxShadow: 'none'}}>
                        <Logout/>
                        <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Paper sx={{ width: '100%', mb: 2, boxShadow: 'none' }}>
                            <EnhancedTableToolbar 
                                numSelected={selected.length} 
                                setOpen={setOpen}
                                setOpenWordFile={setOpenWordFile}
                                test_api={test_api}
                                port_server={port_server}
                                deploy_api={deploy_api}
                                setContentFile={setContentFile}
                                selected={selected}
                                setIsLoadingXMLTables={setIsLoadingXMLTables}
                                setArr_count_tables_xml_settings={setArr_count_tables_xml_settings}
                                setArr_count_tables_xml={setArr_count_tables_xml}
                                numSettings={numSettings}
                                numTables={numTables}
                                Arr_count_tables_xml_settings={Arr_count_tables_xml_settings}
                                setIsLoading={setIsLoading}
                                setOpenXMLFile={setOpenXMLFile}
                                setOpenPDFFile={setOpenPDFFile}
                                options={options}
                                foundFile={foundFile}
                            />
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 750, boxShadow: 'none' }}
                                    aria-labelledby="tableTitle"
                                    size={'medium'}
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={(event: any) => handleSelectAllClick(setSelected, files, event)}
                                        onRequestSort={(event: any, property: any) => handleRequestSort(event, property, setOrder, setOrderBy, order, orderBy)}
                                        rowCount={files.length}
                                        foundFileEnhancedTableHead={foundFile}
                                    />
                                    {
                                        foundFile === true ?
                                        <TableBody>
                                            {visibleRows.map((row, index) => {
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                
                                                return (
                                                    files.map((file) => (
                                                        <TableRow
                                                            hover
                                                            onClick={(event) => handleClick(event, parseInt(file["id_file"]), selected, setSelected)}
                                                            aria-checked={file["id_file"]}
                                                            tabIndex={-1}
                                                            key={parseInt(file["id_file"])}
                                                            selected={file["id_file"]}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox color="primary" checked={isSelected(file["id_file"], selected)} inputProps={{'aria-labelledby': labelId}}/>
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" padding="none" style={{textAlign:"start"}}>{file["file_name"]}</TableCell>
                                                            <TableCell align="right" style={{textAlign:"start"}}>{file["author"]}</TableCell>
                                                            <TableCell align="right" style={{textAlign:"start"}}>{file["time_stamp"]}</TableCell>
                                                        </TableRow>
                                                    ))
                                                );
                                            })}
                                        </TableBody>
                                        :
                                        <TableBody sx={{ 
                                            margin: 'auto',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            boxShadow: 'none',
                                        }}>
                                            {visibleRows.map((row, index) => {
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                return (
                                                        <>
                                                        { foundFile ? (
                                                                
                                                                    files.map((file) => (
                                                                        <TableRow
                                                                        hover
                                                                        onClick={(event) => handleClick(event, parseInt(file["id_file"]), selected, setSelected)}
                                                                        aria-checked={file["id_file"]}
                                                                        tabIndex={-1}
                                                                        key={parseInt(file["id_file"])}
                                                                        selected={file["id_file"]}
                                                                        sx={{ cursor: 'pointer' }}
                                                                        >
                                                                            <TableCell padding="checkbox">
                                                                                <Checkbox color="primary" checked={isSelected(file["id_file"], selected)} inputProps={{'aria-labelledby': labelId}}/>
                                                                            </TableCell>
                                                                            <TableCell component="th" scope="row" padding="none" style={{textAlign:"start"}}>{file["file_name"]}</TableCell>
                                                                            <TableCell align="right" style={{textAlign:"start"}}>{file["author"]}</TableCell>
                                                                            <TableCell align="right" style={{textAlign:"start"}}>{file["time_stamp"]}</TableCell>
                                                                        </TableRow>
                                                                    ))
                                                            ) : <>
                                                                {null}
                                                            </>
                                                        }
                                                        </>
                                                );
                                            })}
                                            {foundFile ?
                                                <TableRow
                                                    style={{
                                                        height: 33 * emptyRows(page, rowsPerPage, rows),
                                                    }}
                                                >
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                                :
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'column',
                                                    gap: '30px',
                                                }}>
                                                    <Button variant="contained" onClick={
                                                        () => {
                                                            window.open('/home/company/create/file', '_self')
                                                        }
                                                    }>Создать файл</Button>
                                                    <Button variant="contained" onClick={
                                                        () => {
                                                            window.open('/home/company/upload/file', '_self')
                                                        }
                                                    }>Загрузить файл</Button>
                                                </Box>
                                            }
                                        </TableBody>
                                    }
                                </Table>
                            </TableContainer>
                            {
                                foundFile === true ?
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={(event: any, newPage: any) => handleChangePage(event, newPage, setPage)}
                                        onRowsPerPageChange={(event: any) => handleChangeRowsPerPage(event, setRowsPerPage, setPage)}
                                        labelRowsPerPage="Строк на странице:"
                                        labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
                                    />
                                : <>{null}</>
                            }
                        </Paper>
                        <Modal
                        open={open}
                        onClose={() => handleClose(setIsLoading, setOpen, setContentFile)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <Typography id="modal-modal-description" sx={{ mt: 2, width: '100%', owerflow: 'auto' }}>
                                {isLoading? 
                                        <Alert severity="info" variant="filled">Ворд документ открывается!</Alert>
                                    : <>
                                        <Box sx={{
                                            "display": "flex",
                                            "position": "sticky",
                                            "top": "91vh",
                                            "justify-content": "space-between",
                                        }}>
                                            <SpeedDial
                                                ariaLabel="SpeedDial openIcon example"
                                                sx={{ 
                                                    "position": "sticky",
                                                    "display": "flex",
                                                    "justify-content": "start",
                                                    "flex-direction": "inherit",
                                                    "height": 0,
                                                    "top": "94vh",
                                                }}
                                                icon={<SpeedDialIcon openIcon={<Edit />} />}
                                            >
                                                {actions.map((action) => (
                                                    <SpeedDialAction
                                                        sx={{
                                                            "matgin-bottom": '55px'
                                                        }}
                                                        key={action.name}
                                                        icon={action.icon}
                                                        tooltipTitle={action.name}
                                                        onClick={() => action_click(action)}
                                                    />
                                                ))}
                                            </SpeedDial>
                                            <>
                                                {
                                                    coppy?
                                                        <Alert 
                                                            sx={{ 
                                                                "position": "sticky",
                                                                "display": "flex",
                                                                "justify-content": "start",
                                                                "flex-direction": "row",
                                                                "top": "94vh",
                                                            }}
                                                            variant="filled" 
                                                            severity="success"
                                                        >
                                                            Текст скопирован
                                                        </Alert>
                                                    :<></>
                                                }
                                            </>
                                        </Box>
                                        

                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                                            'position': 'sticky',
                                            'background': '#FFF',
                                            'width': '102%',
                                            'top': '-10px',
                                            'display': 'flex',
                                            'justifyContent': 'space-between',
                                            "padding": "10px",
                                            "marginLeft": "-10px"
                                        }}>
                                            {contentFile[0]}
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="medium"
                                                onClick={() => handleClose(setIsLoading, setOpen, setContentFile)}
                                            >
                                                <Close fontSize="inherit" />
                                            </IconButton>
                                        </Typography>

                                        <blockquote>
                                            {contentFile.length > 0 ? <>
                                                {contentFile.map((item: any, index: number) => (
                                                    <Typography className="textWord" key={item.id} id="modal-modal-description textWord" sx={{ mt: 2 }}>                            
                                                        {item}
                                                    </Typography>
                                                ))}
                                            </> : <></>}
                                        </blockquote>
                                    </>
                                }
                            </Typography>
                        </Box>
                        </Modal>

                        <Modal
                        open={openPDFFile}
                        onClose={
                            () => handleClosePDF(
                                setOpenPDFFile,
                                setContentFile,
                                setVisiualCard,
                                setClickCardData,
                                setArr_count_head_xml,
                                setArr_count_columns_xml,
                                setOpenChooseString,
                                setComponentTableName_1,
                                setComponentTableName,
                                setCloseListItemTables
                            )
                        }
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <Typography id="modal-modal-description" sx={{ mt: 2, width: '100%', owerflow: 'auto' }}>
                                {isLoading ? <Alert severity="info" variant="filled">PDF документ открывается!</Alert> : <>
                                        <Box sx={{
                                            "display": "flex",
                                            "position": "sticky",
                                            "top": "91vh",
                                            "justify-content": "space-between",
                                        }}>
                                            <SpeedDial
                                                ariaLabel="SpeedDial openIcon example"
                                                sx={{ 
                                                    "position": "sticky",
                                                    "display": "flex",
                                                    "justify-content": "start",
                                                    "flex-direction": "inherit",
                                                    "height": 0,
                                                    "top": "94vh",
                                                }}
                                                icon={<SpeedDialIcon openIcon={<Edit />} />}
                                            >
                                                {actions.map((action) => (
                                                    <SpeedDialAction
                                                        sx={{
                                                            "margin-bottom": '55px'
                                                        }}
                                                        key={action.name}
                                                        icon={action.icon}
                                                        tooltipTitle={action.name}
                                                        onClick={() => {action_click(action)}}
                                                    />
                                                ))}
                                            </SpeedDial>
                                            <>
                                                {
                                                    coppy? 
                                                        <Alert 
                                                            sx={{ 
                                                                "position": "sticky",
                                                                "display": "flex",
                                                                "justify-content": "start",
                                                                "flex-direction": "row",
                                                                "top": "94vh",
                                                            }}
                                                            action={
                                                                <IconButton
                                                                    aria-label="close"
                                                                    color="inherit"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        setCoppy(false);
                                                                    }}
                                                                >
                                                                    <Close fontSize="inherit" />
                                                                </IconButton>
                                                            }
                                                            variant="filled" 
                                                            severity="success"
                                                        >
                                                            Текст скопирован
                                                        </Alert>
                                                    :<></>
                                                }
                                            </>
                                        </Box>
                                        

                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                                            'position': 'sticky',
                                            'background': '#FFF',
                                            'width': '102%',
                                            'top': '-10px',
                                            'display': 'flex',
                                            'justifyContent': 'space-between',
                                            "padding": "10px",
                                            "marginLeft": "-10px"
                                        }}>
                                            {
                                                contentFile.length > 0 && contentFile[0]["name_file"] ? <>
                                                    {contentFile.map((item: any) => (
                                                        <Typography key={item.id} variant="h6" component="h2" id="modal-modal-title">
                                                            {item["name_file"]}
                                                        </Typography>
                                                    ))}
                                                </> : <></>
                                            }
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="medium"
                                                onClick={() => {
                                                    handleClosePDF(
                                                        setOpenPDFFile,
                                                        setContentFile,
                                                        setVisiualCard,
                                                        setClickCardData,
                                                        setArr_count_head_xml,
                                                        setArr_count_columns_xml,
                                                        setOpenChooseString,
                                                        setComponentTableName_1,
                                                        setComponentTableName,
                                                        setCloseListItemTables
                                                    );
                                                }}
                                            >
                                                <Close fontSize="inherit" />
                                            </IconButton>
                                        </Typography>

                                        <blockquote>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                {contentFile.length > 0 ? 
                                                    <>
                                                        {contentFile.map((item: any) => (
                                                            <Typography key={item.id} id="modal-modal-description" sx={{ mt: 2 }}>
                                                                {item["content_file"]}
                                                            </Typography>       
                                                        ))}
                                                    </> : <></>
                                                }
                                            </Typography>
                                        </blockquote>
                                    </>
                                }
                            </Typography>
                        </Box>
                        </Modal>

                        <Modal
                        open={openXMLFile}
                        onClose={
                            () => handleCloseXMLFile(
                                setOpenXMLFile,
                                setIsLoading,
                                setContentFile,
                                setVisiualCard,
                                setClickCardData,
                                setArr_count_head_xml,
                                setArr_count_columns_xml,
                                setOpenChooseString,
                                setComponentTableName_1,
                                setComponentTableName,
                                setCloseListItemTables
                            )
                        }
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        style={{ 
                            overflow: 'hidden', 
                            height: '100%' 
                        }}>
                            <Box>
                                <AppBar sx={{ 
                                    position: 'relative',
                                    zIndex: "9999",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                }} position="static">
                                    <Toolbar variant="dense">
                                        <IconButton
                                        edge="start"
                                        aria-label="close"
                                        color="inherit"
                                        size="medium"
                                        sx={{ mr: 2 }}
                                        onClick={() => {
                                            handleCloseXMLFile(
                                                setOpenXMLFile,
                                                setIsLoading,
                                                setContentFile,
                                                setVisiualCard,
                                                setClickCardData,
                                                setArr_count_head_xml,
                                                setArr_count_columns_xml,
                                                setOpenChooseString,
                                                setComponentTableName_1,
                                                setComponentTableName,
                                                setCloseListItemTables
                                            );
                                        }}
                                        >
                                            <Close fontSize="inherit" />
                                        </IconButton>
                                        <Typography variant="h6" color="inherit" component="div">
                                            {
                                                contentFile.length > 0 ? <>
                                                    {
                                                        contentFile.map((item: any) => (
                                                            <Typography key={item.id} variant="h6" component="h2" id="modal-modal-title">
                                                                {item["name_file"]}
                                                            </Typography>
                                                        ))
                                                    }
                                                </>: <></>
                                            }
                                        </Typography>
                                    </Toolbar>
                                </AppBar>

                                <Box sx={style} style={{
                                    overflow: 'auto',
                                    paddingTop: '6%'
                                }}>
                                    <ToggleButtonGroup
                                            value={alignment}
                                            exclusive
                                            onChange={(event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => handleAlignment(event, newAlignment, setAlignment)}
                                            aria-label="text alignment"
                                            >
                                                <ToggleButton value="left" aria-label="left aligned">
                                                    <TableChart onClick={() => {setVisiualType(true)}} />
                                                </ToggleButton>
                                                <ToggleButton value="center" aria-label="centered">
                                                    <Code onClick={() => {setVisiualType(false)}} />
                                                </ToggleButton>
                                            </ToggleButtonGroup> 
                                
                                    <Typography id="modal-modal-description" sx={{ mt: 2, width: '100%', owerflow: 'auto' }}>
                                        {
                                            isLoading?
                                                <Alert severity="info" variant="filled">XML документ открывается!</Alert>
                                            : <>
                                                <Box position="fixed" display="none" bottom={0}>
                                                    <SpeedDial
                                                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                                                        ariaLabel="SpeedDial openIcon example"
                                                        icon={<SpeedDialIcon openIcon={<Edit />} />}
                                                    >
                                                        {actions.map((action) => (
                                                            <SpeedDialAction
                                                                key={action.name}
                                                                icon={action.icon}
                                                                tooltipTitle={action.name}
                                                                onClick={() => {
                                                                    
                                                                }}
                                                            />
                                                        ))}
                                                    </SpeedDial>
                                                    <>
                                                        {
                                                            coppy?
                                                                <Alert
                                                                    action={
                                                                        <IconButton
                                                                            aria-label="close"
                                                                            color="inherit"
                                                                            size="small"
                                                                            onClick={() => {
                                                                                setCoppy(false);
                                                                            }}
                                                                        >
                                                                            <Close fontSize="inherit" />
                                                                        </IconButton>
                                                                    }
                                                                    variant="filled" 
                                                                    severity="success"
                                                                >
                                                                    Текст скопирован
                                                                </Alert>
                                                            :<></>
                                                        }
                                                    </>
                                                </Box>

                                                {
                                                    visiulCard ?
                                                        <Box sx={{
                                                            "display": "grid",
                                                            "grid-template-columns": "repeat(1, 1fr)",
                                                            "gap": "20px"
                                                        }}>
                                                            {
                                                                arr_count_tables_xml.map((item_1: any) => (
                                                                    <>
                                                                        {
                                                                            isLoadingXMLTables ? <>
                                                                                <Box sx={{
                                                                                    position: 'absolute',
                                                                                    left: '50vW',
                                                                                    top: '50vh'
                                                                                }}>
                                                                                   <CircularProgress /> 
                                                                                </Box>        
                                                                            </> : <>
                                                                                <Card key={item_1.id} onClick={(event) => {
                                                                                    click_card_table_xml(
                                                                                        event,
                                                                                        setDataCellTable,
                                                                                        numValues,
                                                                                        numColumns,
                                                                                        setArr_count_columns_xml,
                                                                                        numHead,
                                                                                        setArr_count_head_xml,
                                                                                        setClickCardData,
                                                                                        setVisiualCard,
                                                                                        port_server,
                                                                                        test_api,
                                                                                        selected
                                                                                    )
                                                                                }}>
                                                                                    <CardActionArea>
                                                                                        <CardContent>
                                                                                            {contentFile.map((item: any) => (
                                                                                                <>
                                                                                                    <Typography gutterBottom variant="h5" component="div">
                                                                                                        {item["tables"]["table_"+item_1]["name"]}
                                                                                                    </Typography>
                                                                                                    <Typography variant="body2" color="text.secondary">
                                                                                                        {
                                                                                                            item["tables"]["table_"+item_1]["content"] === "Пустой" ? <>Нажмите чтобы посмотреть подробнее</> : <>
                                                                                                                {item["tables"]["table_"+item_1]["content"]}
                                                                                                            </>
                                                                                                        }
                                                                                                    </Typography>
                                                                                                </>
                                                                                            ))} 
                                                                                        </CardContent>
                                                                                    </CardActionArea>
                                                                                </Card>        
                                                                            </>
                                                                        } 
                                                                    </>
                                                                ))
                                                            }
                                                        </Box>
                                                    :<>
                                                        {
                                                            visiulCard && click_card_data.length === 0 ? <></> : <>
                                                                    {
                                                                        visiualType && click_card_data !== null ? <>
                                                                            {OpenChooseString ? <Box sx={{ width: '100%' }}>
                                                                                <Button variant="contained" onClick={() => {watch_guide(watchGuide, setWatchGuide)}}>Информация</Button>
                                                                                {
                                                                                   watchGuide ? <>
                                                                                       <Stepper nonLinear activeStep={activeStep}>
                                                                                    {steps.map((label, index) => (
                                                                                      <Step key={label} completed={completed[index]}>
                                                                                        <StepButton color="inherit" onClick={handleStep(index)}>
                                                                                          {label}
                                                                                        </StepButton>
                                                                                      </Step>
                                                                                    ))}
                                                                                </Stepper>
                                                                                <div>
                                                                                    {allStepsCompleted() ? (
                                                                                        <React.Fragment>
                                                                                            <Typography sx={{ mt: 2, mb: 1 }}>
                                                                                                Все шаги закончены
                                                                                            </Typography>
                                                                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                                                              <Box sx={{ flex: '1 1 auto' }} />
                                                                                              <Button onClick={handleReset}>Начать с начала</Button>
                                                                                            </Box>
                                                                                        </React.Fragment>
                                                                                    ) : (
                                                                                    <React.Fragment>
                                                                                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                                                                            <>Шаг {activeStep + 1}</>
                                                                                        </Typography>
                                                                                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                                                                            <DescriptionEditXMLTable data={activeStep}/>
                                                                                        </Typography>
                                                                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                                                          <Button
                                                                                            color="inherit"
                                                                                            disabled={activeStep === 0}
                                                                                            onClick={handleBack}
                                                                                            sx={{ mr: 1 }}
                                                                                          >
                                                                                            Назад
                                                                                          </Button>
                                                                                          <Box sx={{ flex: '1 1 auto' }} />
                                                                                          <Button onClick={handleNext} sx={{ mr: 1 }}>
                                                                                            Вперёд
                                                                                          </Button>
                                                                                          {activeStep !== steps.length &&
                                                                                            (completed[activeStep] ? (
                                                                                              <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                                                                Шаг {activeStep + 1} уже закончен
                                                                                              </Typography>
                                                                                            ) : (
                                                                                              <Button onClick={handleComplete}>
                                                                                                {completedSteps() === totalSteps() - 1
                                                                                                  ? 'Финиш'
                                                                                                  : 'Закончить шаг'}
                                                                                              </Button>
                                                                                            ))}
                                                                                        </Box>
                                                                                    </React.Fragment>
                                                                                )}
                                                                                </div>
                                                                                   </> : <>
                                                                                       <ChooseStringEditXMLTable data={0}/>
                                                                                   </> 
                                                                                }
                                                                            </Box> : <>
                                                                                {click_card_data.map((item:any) => (
                                                                                <>
                                                                                    <TableContainer key={item} component={Paper} sx={{
                                                                                        marginTop: "10px",
                                                                                    }}>
                                                                                    <Typography variant="h4" sx={{
                                                                                        padding: "10px"
                                                                                    }}>{item["table"]["TableName"]}</Typography>
                                                                                        <Table aria-label="collapsible table">
                                                                                            <TableHead>
                                                                                                <TableRow>
                                                                                                    {
                                                                                                        arr_count_head_xml.map((item_1: any) => (
                                                                                                            <TableCell key={item_1}>{item["table"]["columns"]["column_"+item_1]["name"]}</TableCell>
                                                                                                        ))
                                                                                                    }
                                                                                                </TableRow>
                                                                                            </TableHead>
                                                                                            <TableBody className="table_body">
                                                                                                <Row key={item.id} item={item} />
                                                                                                <Parent data={item["table"]["TableName"]}/>
                                                                                            </TableBody>
                                                                                        </Table>                                                            
                                                                                    </TableContainer>
                                                                                    <Settings_cell setDataCellTable={setDataCellTable} dataCellTable, setOpenChooseString/>
                                                                                <div>
                                                                                <Typography variant="h3" sx={{
                                                                                    padding: "10px"
                                                                                }}>Помощь</Typography>

                                                                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                                                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                                                    <Typography>Ваши возможности на этой странице</Typography>
                                                                                    </AccordionSummary>
                                                                                    <AccordionDetails>
                                                                                    <Typography>
                                                                                        Вы можете изменять данные в таблице.
                                                                                        Вы можете удалять данные из таблицы.
                                                                                        Вы можете добавлять данные в таблицу.
                                                                                    </Typography>
                                                                                    </AccordionDetails>
                                                                                </Accordion>
                                                                                
                                                                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                                                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                                                    <Typography>Что означает кнопка с двумя стрелочками?</Typography>
                                                                                    </AccordionSummary>
                                                                                    <AccordionDetails>
                                                                                    <Typography>
                                                                                        В той области вы можете просматривать код, который сейчас редактируете в виде таблицы
                                                                                    </Typography>
                                                                                    </AccordionDetails>
                                                                                </Accordion>

                                                                                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                                                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                                                    <Typography>Что означает кнопка удалить?</Typography>
                                                                                    </AccordionSummary>
                                                                                    <AccordionDetails>
                                                                                    <Typography>
                                                                                        По этой кнопке удаляются все пустые строчки и строчки, которые вы выбрали
                                                                                    </Typography>
                                                                                    </AccordionDetails>
                                                                                </Accordion>

                                                                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                                                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                                                    <Typography>Остались ещё вопросы напишите в поддержку</Typography>
                                                                                    </AccordionSummary>
                                                                                    <AccordionDetails>
                                                                                    <Typography>
                                                                                        Хотите что-то улучшить или появились вопросы напишите нам в поддержку
                                                                                    </Typography>
                                                                                    <Fab sx={{
                                                                                        marginTop: "10px",
                                                                                        width: '145px',
                                                                                        borderRadius: '10px'
                                                                                    }} size="medium" color="info" aria-label="add" onClick={() => {window.open('/home/company/support', '_self')}}>
                                                                                        <Help />
                                                                                        <Typography>Поддержка</Typography>
                                                                                    </Fab>
                                                                                    </AccordionDetails>
                                                                                </Accordion>
                                                                            </div>
                                                                        </>
                                                                    ))}
                                                                            </>}
                                                                        </> : <>
                                                                            <blockquote>
                                                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                                                    {
                                                                                        contentFile.length > 0 && visiualType ? <></> : <>
                                                                                            {contentFile.map((item: any) => (
                                                                                                <Typography key={item.id} id="modal-modal-description" sx={{ mt: 2 }}>
                                                                                                    {item["content_file"]}
                                                                                                </Typography>       
                                                                                            ))}
                                                                                        </>
                                                                                    }
                                                                                </Typography>
                                                                            </blockquote>
                                                                        </>
                                                                    }
                                                                </>
                                                        }
                                                    </>
                                                }
                                            </>
                                        }
                                    </Typography>
                                </Box>
                            </Box>
                        </Modal>

                        <Modal
                        open={openWordFile}
                        onClose={
                            () => handleCloseWordFile(
                                setOpenWordFile,
                                setIsLoading,
                                setContentFile,
                                setVisiualCard,
                                setClickCardData,
                                setArr_count_head_xml,
                                setArr_count_columns_xml,
                                setOpenChooseString,
                                setComponentTableName_1,
                                setComponentTableName,
                                setCloseListItemTables
                            )
                        }
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <Typography id="modal-modal-description" sx={{ mt: 2, width: '100%', owerflow: 'auto' }}>
                                {isLoading?<Alert severity="info" variant="filled">Ворд документ открывается!</Alert>: <>
                                        <Box sx={{
                                            "display": "flex",
                                            "position": "sticky",
                                            "top": "91vh",
                                            "justify-content": "space-between",
                                        }}>
                                            <SpeedDial
                                                ariaLabel="SpeedDial openIcon example"
                                                sx={{ 
                                                    "position": "sticky",
                                                    "display": "flex",
                                                    "justify-content": "start",
                                                    "flex-direction": "inherit",
                                                    "height": 0,
                                                    "top": "94vh",
                                                }}
                                                icon={<SpeedDialIcon openIcon={<Edit />} />}
                                            >
                                                {actions.map((action:any) => (
                                                    <SpeedDialAction
                                                        sx={{
                                                            "matgin-bottom": '55px'
                                                        }}
                                                        key={action.name}
                                                        icon={action.icon}
                                                        tooltipTitle={action.name}
                                                        onClick={() => action_click(action)}
                                                    />
                                                ))}
                                            </SpeedDial>
                                            <>
                                                {
                                                    coppy?
                                                        <Alert 
                                                            sx={{ 
                                                                "position": "sticky",
                                                                "display": "flex",
                                                                "justify-content": "start",
                                                                "flex-direction": "row",
                                                                "top": "94vh",
                                                            }}
                                                            action={
                                                                <IconButton
                                                                    aria-label="close"
                                                                    color="inherit"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        setCoppy(false);
                                                                    }}
                                                                >
                                                                    <Close fontSize="inherit" />
                                                                </IconButton>
                                                            }
                                                            variant="filled" 
                                                            severity="success"
                                                        >
                                                            Текст скопирован
                                                        </Alert>:<></>
                                                }
                                            </>
                                        </Box>
                                        

                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                                            'position': 'sticky',
                                            'background': '#FFF',
                                            'width': '102%',
                                            'top': '-10px',
                                            'display': 'flex',
                                            'justifyContent': 'space-between',
                                            "padding": "10px",
                                            "marginLeft": "-10px"
                                        }}>
                                            {
                                                contentFile.length > 0 ? <>
                                                    {contentFile[0]}
                                                </> : <></>
                                            }
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="medium"
                                                onClick={() => {
                                                    handleCloseWordFile(
                                                        setOpenWordFile,
                                                        setIsLoading,
                                                        setContentFile,
                                                        setVisiualCard,
                                                        setClickCardData,
                                                        setArr_count_head_xml,
                                                        setArr_count_columns_xml,
                                                        setOpenChooseString,
                                                        setComponentTableName_1,
                                                        setComponentTableName,
                                                        setCloseListItemTables
                                                    )
                                                }}
                                            >
                                                <Close fontSize="inherit" />
                                            </IconButton>
                                        </Typography>

                                        <blockquote>
                                            {
                                                contentFile.length > 0 ? <>
                                                    {contentFile.map((item: any, index: number) => (
                                                        <Typography className="textWord" key={item.id} id="modal-modal-description textWord" sx={{ mt: 2 }}>                            
                                                            {item}
                                                        </Typography>
                                                    ))}
                                                </>: <></>
                                            }
                                        </blockquote>
                                    </>
                                }
                            </Typography>
                        </Box>
                        </Modal>
                        </ThemeProvider>
                    </Box>
                </>
            }
        </>
    )
}