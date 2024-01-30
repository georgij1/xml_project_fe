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
    CloudUpload, FolderZip, 
    NoteAdd, OpenInBrowser,
    Close,
    Edit,
    Print,
    FileCopy,
    TableChart,
    Code,
    Add, Delete
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

export const ListFiles = () => {
    const rows = [
        createData(1, 'test', 'test', 'test'),
    ];

    const steps = ['Выбирите строку', 'Выбирите способ', 'Нажмите жёлтую галочку'];
    
    function createData(
        id: number,
        name: string,
        author: string,
        time_stamp: string
    ): Data {
        return {
            id,
            name,
            author,
            time_stamp
        };
    }

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    
    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    
    function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    
    const headCells: readonly HeadCell[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Имя файла',
        },
        {
            id: 'author',
            numeric: true,
            disablePadding: false,
            label: 'Автор',
        },
        {
            id: 'time_stamp',
            numeric: true,
            disablePadding: false,
            label: 'Время',
        }
    ];
    
    interface EnhancedTableProps {
        numSelected: number;
        onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
        onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
        order: Order;
        orderBy: string;
        rowCount: number;
    }

    const [contentFile, setContentFile] = useState([])
    
    function EnhancedTableHead(props: EnhancedTableProps) {
        const { onSelectAllClick, numSelected, rowCount} = props;
        
        return (
            <TableHead>
                    <TableRow>
                        {
                            foundFile === true ?
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={numSelected > 0 && numSelected < rowCount}
                                        checked={rowCount > 0 && numSelected === rowCount}
                                        onChange={onSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                            : <></>
                        }
                        {foundFile === true ? <>
                            {headCells.map((headCell) => (
                                <TableCell key={headCell.label}>{headCell.label}</TableCell>
                            ))}
                        </> : <>{null}</>}
                    </TableRow>
                </TableHead>
        );
    }

    const [arr_count_tables_xml, setArr_count_tables_xml]:any = React.useState([]);
    const [isLoadingXMLTables, setIsLoadingXMLTables]:any = React.useState<boolean>(true);
    
    const EnhancedTableToolbar = (props: Readonly<EnhancedTableToolbarProps>) => {
        const { numSelected } = props;
        const options = ['Просмотр', 'Просмотреть как PDF', 'Просмотреть как XML', 'Просмотреть как Word файл'];    
        const [open, setOpen_1] = React.useState(false);
        const anchorRef = React.useRef<HTMLDivElement>(null);
        const [selectedIndex, setSelectedIndex] = React.useState(1);
        let numTables:any[] = [];
        
        const handleClick = () => {
            console.info(`You clicked ${options[selectedIndex]}`);
            if (options[selectedIndex] === "Просмотреть как PDF") {
                setOpenPDFFile(true)
                selected.map((id) => {
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

            else if (options[selectedIndex] === "Просмотреть как XML") {
                setOpenXMLFile(true)
                selected.map((id) => {
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
                            setArr_count_tables_xml(numTables)
                            setIsLoadingXMLTables(false)
                        })
                        .catch((error) => console.log(error))
                })
            }

            else if (options[selectedIndex] === "Просмотреть как Word файл") {
                setOpenWordFile(true)
                selected.map((id) => {
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
        };

        const handleMenuItemClick = (
            index: number,
        ) => {
            setSelectedIndex(index);
            setOpen_1(false);
        };

        const handleToggle = () => {
            setOpen_1((prevOpen) => !prevOpen);
        };

        const handleClose = (event: Event) => {
            if (anchorRef.current?.contains(event.target as HTMLElement)) {return;}
            setOpen_1(false);
        };

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 && foundFile === true ? 
                    (<Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected === 1 ? <>
                            1 выбран
                        </> : <>
                            {numSelected} выбрано
                        </>
                        }
                    </Typography>)
                : 
                     
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Файлы
                        </Typography>
                }
                {numSelected > 0 ? (
                    <> {numSelected === 1 ? <>
                        <Tooltip title="Собрать пакет документов" onClick={() => {
                            console.info('create packet of document')
                        }}><IconButton><FolderZip /></IconButton>
                        </Tooltip>
                        <Tooltip title="Открыть в браузере" onClick={() => {
                            selected.map((id) => {
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
                        }}>
                            <IconButton>
                                <OpenInBrowser />
                            </IconButton>
                        </Tooltip>
    
                        <IconButton>
                            <React.Fragment>
                                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                                    <Button onClick={handleClick} style={{textTransform:'none'}}>{options[selectedIndex]}</Button>
                                    <Button
                                    size="small"
                                    aria-controls={open ? 'split-button-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-label="select merge strategy"
                                    aria-haspopup="menu"
                                    onClick={handleToggle}
                                    >
                                    <ArrowDropDownIcon />
                                    </Button>
                                </ButtonGroup>
                                <Popper
                                    sx={{
                                    zIndex: 1,
                                    }}
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    transition
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                        transformOrigin:
                                            placement === 'bottom' ? 'center top' : 'center bottom',
                                        }}
                                    >
                                        <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index===0}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(index)}
                                                >
                                                {option}
                                                </MenuItem>
                                            ))}
                                            </MenuList>
                                        </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                    )}
                                </Popper>
                            </React.Fragment>
                        </IconButton>
                        <Tooltip title="Удалить" onClick={() => {
                            selected.map(select => {
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
                                        console.log("Возможно произошло изменение на сервире и фронт его пока ещё не подтянул")
                                    }
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                            })
                        }}>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </> : <>
                        <Tooltip title="Собрать пакет документов" onClick={() => {
                            console.info('create packet of document')
                        }}>
                            <IconButton>
                                <FolderZip />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить" onClick={() => {
                            console.info('delete')
                        }}>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>}
                    </>
                ) : (
                    <>    
                        <Tooltip title="Создать" onClick={() => {window.open(`/home/company/create/file`, '_self')}}>
                            <IconButton>
                                <NoteAdd />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Загрузить" onClick={() => {window.open(`/home/company/upload/file`, '_self')}}>
                            <IconButton>
                                <CloudUpload />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Toolbar>
        );
    }

    const [files, setFiles] = useState([])

    const [foundFile, setFoundFile] = useState<boolean>(false)

    const [isLoadingElementMain, setIsLoadingElementMain] = React.useState<boolean>(true);

    useEffect(() => {
        GetFileList(setFiles, setFoundFile, setIsLoadingElementMain)
    }, [])

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('author');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = files.map((n) => n["id_file"]);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    const [open, setOpen] = React.useState(false);
    const [openPDFFile, setOpenPDFFile] = React.useState(false);
    const [openXMLFile, setOpenXMLFile] = React.useState(false);
    const [openWordFile, setOpenWordFile] = React.useState(false);
    
    const handleClose = () => {
        setIsLoading(true)
        setOpen(false)
        setContentFile([])
    }
    
    const handleClosePDF = () => {
        setOpenPDFFile(false)
        setContentFile([])
    }

    const handleCloseXMLFile = () => {
        setOpenXMLFile(false)
        setIsLoading(true)
        setContentFile([])
        setVisiualCard(true)
        setClickCardData([])
        setArr_count_head_xml([])
        setArr_count_columns_xml([])
        setOpenChooseString(false)
        setComponentTableName_1([])
        setComponentTableName([])
        setCloseListItemTables(false)

    }

    const handleCloseWordFile = () => {
        setOpenWordFile(false)
        setIsLoading(true)
        setContentFile([])
    }

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
        { icon: <Print />, name: 'Печать' },
    ];

    const [coppy, setCoppy] = React.useState(false);
    const [alignment, setAlignment] = React.useState<string | null>('left');
    const [visiualType, setVisiualType] = React.useState(true);
    const [visiulCard, setVisiualCard] = React.useState(true);
    const [click_card_data, setClickCardData] = React.useState([]);

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
      ) => {
        setAlignment(newAlignment);
    };

    let numColumns:any[] = []
    let numHead:any[] = []
    let [arr_count_columns_xml, setArr_count_columns_xml]:any = React.useState([]);
    let [arr_count_head_xml, setArr_count_head_xml]:any = React.useState([]);
    let numValues:any[] = []
    const addDataCellTable = () => setDataCellTable([...dataCellTable, {value: 'Данных нет'}]);
    const [dataCellTable, setDataCellTable] = React.useState([{ value: 'Данных нет' }]);
    const [watchGuide, setWatchGuide] = React.useState(false)

    const watch_guide = () => {
        if (watchGuide === true) {
            setWatchGuide(false)
        }

        else {
            setWatchGuide(true)
        }
    }

    const click_card_table_xml = (event: React.MouseEvent<HTMLElement>) => {
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

    type RowProps = {
        item: any;
    };

    const remove_data_table_xml = () => {
        console.log("remove_data_table_xml")
        setDataCellTable([])
    }

    const edit_cell_table_xml = () => {
        console.log("edit_cell_table_xml")
        setOpenChooseString(true)
    }

    const StyleSettingsCell = {
        "display": "flex",
        "gap": "10px"
    }

    const [OpenChooseString, setOpenChooseString] = React.useState(false)

    const Settings_cell = () => {
        return (
            <Box style={StyleSettingsCell}>
                <Tooltip title="Добавить">
                    <Fab sx={{
                        marginTop: "10px",
                        borderRadius: '10px',
                        gap: '5px'
                    }} size="medium" color="info" aria-label="add" onClick={addDataCellTable}>
                        <Add />
                    </Fab>    
                </Tooltip>
                <Tooltip title="Изменить">
                    <Fab sx={{
                        marginTop: "10px",
                        borderRadius: '10px',
                        gap: '5px'
                    }} size="medium" color="info" aria-label="edit" onClick={edit_cell_table_xml}>
                        <Edit />
                    </Fab>    
                </Tooltip>
                <Tooltip title="Удалить">
                    <Fab sx={{
                        marginTop: "10px",
                        borderRadius: '10px',
                        gap: '5px'
                    }} size="medium" color="info" aria-label="add" onClick={remove_data_table_xml}>
                        <Delete />
                    </Fab>
                </Tooltip>
            </Box>
        )
    }

    const Parent = (props:any) => {
        console.log(props)
        console.log(dataCellTable)


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
                            <EnhancedTableToolbar numSelected={selected.length} />
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
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={files.length}
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
                                                            onClick={(event) => handleClick(event, parseInt(file["id_file"]))}
                                                            aria-checked={file["id_file"]}
                                                            tabIndex={-1}
                                                            key={parseInt(file["id_file"])}
                                                            selected={file["id_file"]}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox color="primary" checked={isSelected(file["id_file"])} inputProps={{'aria-labelledby': labelId}}/>
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
                                                                        onClick={(event) => handleClick(event, parseInt(file["id_file"]))}
                                                                        aria-checked={file["id_file"]}
                                                                        tabIndex={-1}
                                                                        key={parseInt(file["id_file"])}
                                                                        selected={file["id_file"]}
                                                                        sx={{ cursor: 'pointer' }}
                                                                        >
                                                                            <TableCell padding="checkbox">
                                                                                <Checkbox color="primary" checked={isSelected(file["id_file"])} inputProps={{'aria-labelledby': labelId}}/>
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
                                                        height: 33 * emptyRows,
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
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage="Строк на странице:"
                                        labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
                                    />
                                : <>{null}</>
                            }
                        </Paper>
                        <Modal
                        open={open}
                        onClose={handleClose}
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
                                                onClick={() => {
                                                    handleClose();
                                                }}
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
                        onClose={handleClosePDF}
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
                                                    handleClosePDF();
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
                        onClose={handleCloseXMLFile}
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
                                            handleCloseXMLFile();
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
                                            onChange={handleAlignment}
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
                                                                                    click_card_table_xml(event)
                                                                                }}>
                                                                                    <CardActionArea>
                                                                                        <CardContent>
                                                                                            {contentFile.map((item: any) => (
                                                                                                <>
                                                                                                    <Typography gutterBottom variant="h5" component="div">
                                                                                                    {item["tables"]["table_"+item_1]["name"]}
                                                                                                    </Typography>
                                                                                                    <Typography variant="body2" color="text.secondary">
                                                                                                        {item["tables"]["table_"+item_1]["content"]}
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
                                                                                <Button variant="contained" onClick={() => {watch_guide()}}>Информация</Button>
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
                                                                                    <Settings_cell/>
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
                        onClose={handleCloseWordFile}
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
                                                    handleCloseWordFile();
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