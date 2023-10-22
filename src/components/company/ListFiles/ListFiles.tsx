import "./ListFiles.css";
import React, {useEffect, useState} from "react";
import {Logout} from "../../message/Logout";
import {
    alpha,
    Box,
    Checkbox, FormControlLabel, IconButton, Paper, Switch, Table, TableBody,
    TableCell, TableContainer,
    TableHead, TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {FolderZip, NoteAdd, OpenInBrowser, SaveAs} from "@mui/icons-material";


interface Data {
    id: number;
    name: string;
    author: string;
    time_stamp: string;
}

// eslint-disable-next-line react-hooks/exhaustive-deps
let body = {
    "NameCompany": localStorage.getItem('NameCompany')
}

const rows = [
    createData(1, 'Имя файла_1', 'Панов', '20:00'),
    createData(2, 'Имя файла_2', 'Панов г.', '21:00'),
    createData(3, 'Имя файла_3', 'Панов г. в.', '22:00')
];

fetch(`http://localhost:8080/file/list`, {
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
        if (data[0].image_name !== "Not found file") {
            data.forEach((item: any) => {
                rows.push(createData(item.id, item["image_name"], item["author"], item["time_stamp"]))
                console.log(rows)
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })

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

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
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
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

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
            {numSelected > 0 ? (
                <Typography
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
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Файлы
                </Typography>
            )}
            {numSelected > 0 ? (
                <> {numSelected === 1 ? <>
                    <Tooltip title="Собрать пакет документов">
                        <IconButton>
                            <FolderZip />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Открыть в браузере">
                        <IconButton>
                            <OpenInBrowser />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Сохранить как">
                        <IconButton>
                            <SaveAs />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Удалить">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </> : <>
                    <Tooltip title="Собрать пакет документов">
                        <IconButton>
                            <FolderZip />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Удалить">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>}
                </>
            ) : (
                <>
                    <Tooltip title="Фильтровать">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Создать">
                        <IconButton>
                            <NoteAdd />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </Toolbar>
    );
}

export const ListFiles = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let body = {
        "NameCompany": localStorage.getItem('NameCompany')
    }

    const [files, setFiles] = useState([])

    const [foundFile, setFoundFile] = useState<boolean>(false)

    useEffect(() => {
        fetch(`http://localhost:8080/file/list`, {
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
                if (data[0].image_name !== "Not found file") {
                    data.forEach((item: any) => {
                        setFiles(item)
                        rows.push(createData(item.id, item["image_name"], item["author"], item["time_stamp"]))
                        setFoundFile(true)
                        console.log(rows)
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

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
            const newSelected = rows.map((n) => n.id);
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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
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

    if (localStorage.getItem('dark_theme')) {
        document.body.classList.add('dark_theme_body')
        return (
            <>
                <Logout/>
                {
                    foundFile ? <>
                         <div className="pt-24">
                             <div className="flex items-center m-5 gap-x-10">
                                 <div className="shadow-lg border-cyan-500/50 border-2 shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none">Выбрать</div>
                                 <input type="time" className="border-cyan-500/50 border-2 bg-black shadow-lg shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none"/>
                                 <input placeholder="Введите название файла..." className="border-cyan-500/50 border-2 bg-black shadow-lg shadow-cyan-500/50 cursor-pointer p-2 rounded hover:shadow-none"/>
                             </div>
                             <table className="md:table-fixed">
                                 <thead>
                             <tr className="bg-slate-500">
                                     <th className="hover:bg-cyan-500 cursor-pointer">Имя</th>
                                     <th className="hover:bg-cyan-500 cursor-pointer">Время</th>
                                     <th className="hover:bg-cyan-500 cursor-pointer">Автор</th>
                                     <th className="hover:bg-cyan-500 cursor-pointer">Компания</th>
                                 </tr>
                             </thead>
                                 <tbody>
                                 {files.map(file => (
                                        <tr className="bg-sate-300 shadow-slate-100 not_active cursor-pointer"
                                            onClick={(event) => {
                                                // @ts-ignore
                                                // eslint-disable-next-line no-useless-concat
                                                window.open("http://localhost:8080/file/download/" + `${localStorage.getItem('NameCompany')}` + "/" + `${event.currentTarget.querySelector('td').textContent}`)
                                            }}>
                                             <td key={file["id"]}>{file["image_name"]}</td>
                                             <td key={file["id"]}>{file["time_stamp"]}</td>
                                             <td key={file["id"]}>{file["author"]}</td>
                                             <td key={file["id"]}>{file["name_company"]}</td>
                                         </tr>))}
                                </tbody>
                             </table>
                        </div>
                    </> : <>
                        <div className="pt-24 h-screen inline-flex flex-col justify-center m-auto w-full items-center">
                            <div className="text-center">Нет данных</div>
                        </div>
                    </>
                }
            </>
        )
    }

    else {
        // files.map((file) => console.log(file))

        return (
            <Box sx={{ width: '100%' }} className="pt-24">
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                           <TableCell padding="checkbox">
                                               <Checkbox
                                                   color="primary"
                                                   checked={isItemSelected}
                                                   inputProps={{
                                                       'aria-labelledby': labelId,
                                                   }}
                                               />
                                           </TableCell>
                                           <TableCell
                                               component="th"
                                               id={labelId}
                                               scope="row"
                                               padding="none"
                                           >{row.name}</TableCell>
                                           <TableCell align="right">{row.author}</TableCell>

                                           <TableCell align="right">{row.time_stamp}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Уменьшить отступ"
                />
            </Box>
        )
    }
}