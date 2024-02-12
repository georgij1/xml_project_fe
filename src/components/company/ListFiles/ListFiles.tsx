import "./ListFiles.css";
import React, {useEffect} from "react";
import {Logout} from "../../message/Logout";
import {
    Alert,
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
    Typography
} from "@mui/material";
import {
    Close,
    Edit,
    Print,
    FileCopy,
    TableChart,
    Code
} from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, styled  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { style } from "../../../data/objects/Style";
import { GetFileList } from "../../../data/api/file/GetFileList";
import { Data } from "../../../data/interface/DataTableFiles";
import { Order } from "../../../data/Type/TypeSortTable";
import { deploy_api, port_server, test_api } from "../../../data/ServerVariable";
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
import { rows } from "../../../data/objects/CreateDataTable";
import { steps } from "../../../data/objects/steps_array";
import { numTables } from "../../../data/objects/numTables";
import { getComparator } from "../../../data/function/GetComparator";
import { stableSort } from "../../../data/function/StableSort";
import { EnhancedTableHead } from "../../../data/function/EnhancedTableHead";
import { options } from "../../../data/objects/EnhancedTableToolbarOptions";
import { numSettings } from "../../../data/objects/numSettings";
import { handleRequestSort } from "../../../data/objects/handleRequestSort";
import { handleClose } from "../../../data/objects/handleClose";
import { handleSelectAllClick } from "../../../data/objects/handleSelectAllClick";
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
import { watch_guide } from "../../../data/objects/watch_guide";
import { click_card_table_xml } from "../../../data/api/file/click_card_table_xml";
import { Settings_cell } from "../../../data/CustomsElements/Settings_cell";
import { Parent } from "../../../data/CustomsElements/Parent";
import { DescriptionEditXMLTable } from "../../../data/mui_elements/DescriptionEditXMLTable";
import { SuccessMessage } from "../../../data/mui_elements/SuccessMessage";
import { ErrorMessage } from "../../../data/mui_elements/ErrorMessage";
import { ChooseStringEditXMLTable } from "../../../data/mui_elements/ChooseStringEditXMLTable";
import { Row } from "../../../data/mui_elements/Row";
import { handleChange } from "../../../data/objects/handleChange";
import { action_click } from "../../../data/objects/action_click";
import { totalSteps } from "../../../data/objects/totalSteps";
import { completedSteps } from "../../../data/objects/completedSteps";
import { isLastStep } from "../../../data/objects/isLastStep";
import { allStepsCompleted } from "../../../data/objects/allStepsCompleted";
import { handleNext } from "../../../data/objects/handleNext";
import { handleBack } from "../../../data/objects/handleBack";
import { handleStep } from "../../../data/objects/handleStep";
import { handleComplete } from "../../../data/objects/handleComplete";
import { handleReset } from "../../../data/objects/handleReset";

export const ListFiles = () => {
    const [contentFile, setContentFile] = React.useState([]);
    const [arr_count_tables_xml, setArr_count_tables_xml] = React.useState([]);
    const [isLoadingXMLTables, setIsLoadingXMLTables] = React.useState<boolean>(true);
    const [Arr_count_tables_xml_settings, setArr_count_tables_xml_settings] = React.useState([]);
    const [files, setFiles] = React.useState([]);
    const [foundFile, setFoundFile] = React.useState<boolean>(false);
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
    const [arr_count_columns_xml, setArr_count_columns_xml] = React.useState([]);
    const [arr_count_head_xml, setArr_count_head_xml] = React.useState([]);
    const [dataCellTable, setDataCellTable] = React.useState([{ value: 'Данных нет' }]);
    const [watchGuide, setWatchGuide] = React.useState(false);
    const [ShowSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [ShowErrorMessage, setShowErrorMessage] = React.useState(false);
    const [ComponentTableName, setComponentTableName] = React.useState([]);
    const [ComponentTableName_1, setComponentTableName_1] = React.useState([""]);
    const [CloseListItemTables, setCloseListItemTables] = React.useState(false);
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{[k: number]: boolean;}>({});

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

    return (
        <>
            {
                isLoadingElementMain ?
                    <Box sx={{
                    position: 'absolute',
                    left: '50vW',
                    top: '50vh'
                    }}>
                       <CircularProgress /> 
                    </Box>
                :
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
                                                        onClick={() => action_click(action, setCoppy)}
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
                                                        onClick={() => {action_click(action, setCoppy)}}
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
                                                                                        <StepButton color="inherit" onClick={() => handleStep(index, setActiveStep)}>
                                                                                          {label}
                                                                                        </StepButton>
                                                                                      </Step>
                                                                                    ))}
                                                                                </Stepper>
                                                                                <div>
                                                                                    {allStepsCompleted(completedSteps, completed, totalSteps, steps) ? (
                                                                                        <React.Fragment>
                                                                                            <Typography sx={{ mt: 2, mb: 1 }}>
                                                                                                Все шаги закончены
                                                                                            </Typography>
                                                                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                                                              <Box sx={{ flex: '1 1 auto' }} />
                                                                                              <Button onClick={() => handleReset(setActiveStep, setCompleted)}>Начать с начала</Button>
                                                                                            </Box>
                                                                                        </React.Fragment>
                                                                                    ) : (
                                                                                    <React.Fragment>
                                                                                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                                                                            <>Шаг {activeStep + 1}</>
                                                                                        </Typography>
                                                                                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                                                                            <DescriptionEditXMLTable data={activeStep} arr_count_columns_xml={arr_count_columns_xml} click_card_data={click_card_data}/>
                                                                                        </Typography>
                                                                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                                                          <Button
                                                                                            color="inherit"
                                                                                            disabled={activeStep === 0}
                                                                                            onClick={() => handleBack(setActiveStep)}
                                                                                            sx={{ mr: 1 }}
                                                                                          >
                                                                                            Назад
                                                                                          </Button>
                                                                                          <Box sx={{ flex: '1 1 auto' }} />
                                                                                          <Button onClick={() => handleNext(isLastStep,
                                                                                                activeStep,
                                                                                                totalSteps,
                                                                                                steps,
                                                                                                allStepsCompleted,
                                                                                                completedSteps,
                                                                                                completed,
                                                                                                setActiveStep
                                                                                            )} sx={{ mr: 1 }}>
                                                                                            Вперёд
                                                                                          </Button>
                                                                                          {activeStep !== steps.length &&
                                                                                            (completed[activeStep] ? (
                                                                                              <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                                                                Шаг {activeStep + 1} уже закончен
                                                                                              </Typography>
                                                                                            ) : (
                                                                                              <Button onClick={() => handleComplete(completed,
                                                                                                activeStep,
                                                                                                setActiveStep,
                                                                                                setCompleted,
                                                                                                handleNext,
                                                                                                isLastStep,
                                                                                                totalSteps,
                                                                                                steps,
                                                                                                allStepsCompleted,
                                                                                                completedSteps)}>
                                                                                                {completedSteps(completed) === totalSteps(steps) - 1
                                                                                                  ? 'Финиш'
                                                                                                  : 'Закончить шаг'}
                                                                                              </Button>
                                                                                            ))}
                                                                                        </Box>
                                                                                    </React.Fragment>
                                                                                )}
                                                                                </div>
                                                                                   </> :
                                                                                        <ChooseStringEditXMLTable 
                                                                                            data={0} 
                                                                                            setCloseListItemTables={setCloseListItemTables}
                                                                                            setShowSuccessMessage={setShowSuccessMessage}
                                                                                            setShowErrorMessage={setShowErrorMessage}
                                                                                            arr_count_columns_xml={arr_count_columns_xml}
                                                                                            ShowErrorMessage={ShowErrorMessage}
                                                                                            contentFile={contentFile}
                                                                                            arr_count_head_xml={arr_count_head_xml}
                                                                                            setComponentTableName_1={setComponentTableName_1}
                                                                                            click_card_data={click_card_data}
                                                                                            setComponentTableName={setComponentTableName}
                                                                                            ErrorMessage={ErrorMessage}
                                                                                            ComponentTableName_1={ComponentTableName_1}
                                                                                            ComponentTableName={ComponentTableName}
                                                                                            ShowSuccessMessage={ShowSuccessMessage}
                                                                                            SuccessMessage={SuccessMessage}
                                                                                            CloseListItemTables={CloseListItemTables}
                                                                                            open={open}
                                                                                        />
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
                                                                                                <Row key={item.id} item={item} arr_count_columns_xml={arr_count_columns_xml} />
                                                                                                <Parent data={item["table"]["TableName"]} dataCellTable={dataCellTable}/>
                                                                                            </TableBody>
                                                                                        </Table>                                                            
                                                                                    </TableContainer>
                                                                                    <Settings_cell setDataCellTable={setDataCellTable} dataCellTable={dataCellTable} setOpenChooseString={setOpenChooseString}/>
                                                                                <div>
                                                                                <Typography variant="h3" sx={{
                                                                                    padding: "10px"
                                                                                }}>Помощь</Typography>

                                                                                <Accordion expanded={expanded === 'panel2'} onChange={(newExpanded: any) => handleChange('panel1', newExpanded, setExpanded)}>
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
                                                                                
                                                                                <Accordion expanded={expanded === 'panel3'} onChange={(newExpanded: any) => handleChange('panel1', newExpanded, setExpanded)}>
                                                                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                                                    <Typography>Что означает кнопка с двумя стрелочками?</Typography>
                                                                                    </AccordionSummary>
                                                                                    <AccordionDetails>
                                                                                    <Typography>
                                                                                        В той области вы можете просматривать код, который сейчас редактируете в виде таблицы
                                                                                    </Typography>
                                                                                    </AccordionDetails>
                                                                                </Accordion>

                                                                                <Accordion expanded={expanded === 'panel4'} onChange={(newExpanded: any) => handleChange('panel1', newExpanded, setExpanded)}>
                                                                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                                                    <Typography>Что означает кнопка удалить?</Typography>
                                                                                    </AccordionSummary>
                                                                                    <AccordionDetails>
                                                                                    <Typography>
                                                                                        По этой кнопке удаляются все пустые строчки и строчки, которые вы выбрали
                                                                                    </Typography>
                                                                                    </AccordionDetails>
                                                                                </Accordion>

                                                                                <Accordion expanded={expanded === 'panel1'} onChange={(newExpanded: any) => handleChange('panel1', newExpanded, setExpanded)}>
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
                                                        onClick={() => action_click(action, setCoppy)}
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
            }
        </>
    )
}