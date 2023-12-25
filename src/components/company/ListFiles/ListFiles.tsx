import React, {useEffect, useState} from "react";
import {Logout} from "../../message/Logout";
import {
    alpha,
    Box,
    Checkbox, IconButton, Paper, Table, TableBody,
    TableCell, TableContainer,
    TableHead, TablePagination,
    TableRow,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {CloudUpload, FolderZip, NoteAdd, OpenInBrowser} from "@mui/icons-material";
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { style } from "../../../data/objects/Style";
import { GetFileList } from "../../../data/api/file/GetFileList";

export const ListFiles = () => {
    const test_api = "http://localhost:"
    const deploy_api = "http://10.3.9.83:"
    const port_server = "8080"

    interface Data {
        id: number;
        name: string;
        author: string;
        time_stamp: string;
    }
    
    const rows = [
        createData(1, 'test', 'test', 'test'),
    ];
    
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
    
    type Order = 'asc' | 'desc';
    
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
    
    interface HeadCell {
        disablePadding: boolean;
        id: keyof Data;
        label: string;
        numeric: boolean;
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
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
        
        const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    
        return (
            <TableHead>
                    <TableRow>
                        {
                            foundFile === true ? <>
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
                            </> : <>{null}</>
                        }
                        {foundFile === true ? <>
                            {headCells.map((headCell) => (
                                <TableCell>{headCell.label}</TableCell>
                            ))}
                        </> : <>{null}</>}
                    </TableRow>
                </TableHead>
        );
    }
    
    interface EnhancedTableToolbarProps {
        numSelected: number;
    }
    
    function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
        const { numSelected } = props;
        const options = ['Просмотр', 'Просмотреть как PDF', 'Просмотреть как XML', 'Просмотреть как Word файл'];    
        const [open, setOpen_1] = React.useState(false);
        const anchorRef = React.useRef<HTMLDivElement>(null);
        const [selectedIndex, setSelectedIndex] = React.useState(1);

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
                        .then((data) => setContentFile(data))
                        .catch((error) => console.log(error))
                })
            }

            else if (options[selectedIndex] === "Просмотреть как XML") {
                setOpenXMLFile(true)
                selected.map((id) => {
                    fetch(deploy_api+port_server+`/file/read/XML/${localStorage.getItem('NameCompany')}/${id}`, {
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
                        .then((data) => setContentFile(data))
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
                        .then((data) => setContentFile(data))
                        .catch((error) => console.log(error))
                })
            }
        };

        const handleMenuItemClick = (
            event: React.MouseEvent<HTMLLIElement, MouseEvent>,
            index: number,
        ) => {
            setSelectedIndex(index);
            setOpen_1(false);
        };

        const handleToggle = () => {
            setOpen_1((prevOpen) => !prevOpen);
        };

        const handleClose = (event: Event) => {
            if (
                anchorRef.current 
                &&
                anchorRef.current.contains(event.target as HTMLElement)
            ) {return;}
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
                        }}>
                            <IconButton>
                                <FolderZip />
                            </IconButton>
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
                                    .then((data) => setContentFile(data))
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
                                                disabled={index==0}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
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

    useEffect(() => {GetFileList(setFiles, setFoundFile)}, [])

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('author');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
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

    let FilterContentFile = contentFile.filter((item: any) => {
        return item !== contentFile[0]
    })

    const handleClose = () => {
        setOpen(false)
        setContentFile([])
        FilterContentFile = []
    }
    
    const handleClosePDF = () => {
        setOpenPDFFile(false)
        setContentFile([])
        FilterContentFile = []
    }

    const handleCloseXMLFile = () => {
        setOpenXMLFile(false)
    }

    const handleCloseWordFile = () => {
        setOpenWordFile(false)
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

    return (
        <Box sx={{ width: '100%', boxShadow: 'none' }}>
            <Logout/>
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper sx={{ width: '100%', mb: 2, boxShadow: 'none' }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750, boxShadow: 'none' }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
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
                                            height: (dense ? 33 : 53) * emptyRows,
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
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {contentFile[0]}
                    </Typography>
                    {FilterContentFile.map((item: any, index: number) => (
                            <Typography key={item.id} id="modal-modal-description" sx={{ mt: 2 }}>                            
                                {item}
                            </Typography>
                        ))
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
                {contentFile.map((item: any) => (
                    <Typography key={item.id} variant="h6" component="h2" id="modal-modal-title">
                        {item["name_file"]}
                    </Typography>
                ))}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {contentFile.map((item: any) => (
                        <Typography key={item.id} id="modal-modal-description" sx={{ mt: 2 }}>
                            {item["content_file"]}
                        </Typography>       
                    ))
                }
                </Typography>
            </Box>
            </Modal>

            <Modal
            open={openXMLFile}
            onClose={handleCloseXMLFile}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                XML file
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {contentFile.map((item: any) => (
                        <Typography key={item.id} id="modal-modal-description" sx={{ mt: 2 }}>
                            {item}
                        </Typography>
                    ))
                }
                </Typography>
            </Box>
            </Modal>

            <Modal
            open={openWordFile}
            onClose={handleCloseWordFile}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {contentFile[0]}
                    </Typography>
                    {FilterContentFile.map((item: any) => (
                            <Typography key={item.id} id="modal-modal-description" sx={{ mt: 2 }}>                            
                                {item}
                            </Typography>       
                        ))
                    }
            </Box>
            </Modal>
            </ThemeProvider>
        </Box>
    )
}