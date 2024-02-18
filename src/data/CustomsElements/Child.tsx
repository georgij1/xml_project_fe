import {
    TableRow,
    TableCell,
    Typography,
    TextField,
    Skeleton,
    Chip,
    Tooltip
} from "@mui/material";
import { 
    EditEmptyFields
} from "./Editor/EditEmtyFields";
import React from "react";
import { Modal } from '@mui/base/Modal';
import { Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { deploy_api, port_server, test_api } from "../ServerVariable";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CalendarToday, Grade, Grading, Notes, TextFields } from "@mui/icons-material";

interface PropsChild {
    data: any;
    dataCellTable: any;
    selected: any;
}

const StyleTableCell = {
    "cursor": "pointer"
}

export const Child = (
    {
        data,
        dataCellTable,
        selected
    }: PropsChild
) => {
    const [showEditor, setShowEditor] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(true);

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const [fieldNormalShow, setFieldNormalShow] = React.useState<boolean>(true);
    const [fieldBigHieghtShow, setFieldBigHieghtShow] = React.useState<boolean>(false);
    const [fieldDateShow, setFieldDateShow] = React.useState<boolean>(false);
    const [chooseContextFile, setChooseContextFile] = React.useState<boolean>(false);
    const [preloadContextFile, setPreloadContextFile] = React.useState<boolean>(true);
    const [valueContextFile, setValueContextFile] = React.useState([]);

    const GetContentFile = (
        selected: any
    ) => {
        console.log(selected)
        selected.map((item: any) => {
            fetch(test_api+port_server+`/file/read/split_words/${localStorage.getItem('NameCompany')}/${item}`, {
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
                    setValueContextFile(data)
                    setPreloadContextFile(false)
                    
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    const [pagePagination, setPagePagination] = React.useState<number>(0);
    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => setPagePagination(value);
    const showSplitWords = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [countSelectedSplitWords, setCountSelectedSplitWords] = React.useState<number>(1);
    const [dataCreateTable, setDataCreateTable] = React.useState([]);
    const [chooseSplitWords, setChooseSplitWords] = React.useState([{
        "org_full_name": [dataCreateTable],
        "org_ogrn": "",
        "org_inn": "",
        "org_kpp": "",
        "region": "",
        "city": "",
        "street": "",
        "building": "",
        "room": ""
    }]);

    const save_data = (
        eventOrgFullName: any
    ) => {
        console.log(eventOrgFullName.textContent)
        setCountSelectedSplitWords(countSelectedSplitWords+1)
        console.log(countSelectedSplitWords)
        if (dataCreateTable.length === 0) {
            setDataCreateTable(eventOrgFullName.textContent)    
        }

        else {
            setDataCreateTable(dataCreateTable.concat(eventOrgFullName.textContent))
        }

        ChooseSplitWords()
    }

    const ChooseSplitWords = () => {
        setChooseSplitWords([{
            "org_full_name": [dataCreateTable],
            "org_ogrn": "",
            "org_inn": "",
            "org_kpp": "",
            "region": "",
            "city": "",
            "street": "",
            "building": "",
            "room": ""
        }])
    }

    const ChooseContentFromFile = () => {
        console.log(chooseSplitWords)

        return (
            <>
                {preloadContextFile ?
                    <>
                        <Box sx={{ width: 300 }}>
                            {
                                showSplitWords.map((item: any) => (
                                    <>
                                        <Skeleton />
                                        <Skeleton animation="wave" />
                                        <Skeleton animation={false} />        
                                    </>
                                ))
                            }
                        </Box>
                    </>
                    :
                    <>
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" spacing={1} sx={{ 
                                display: "grid", 
                                gridTemplateColumns: "1fr 1fr",
                                gap: "15px",
                                width: "73vW" 
                            }}>
                                {
                                    countSelectedSplitWords !== undefined || null ? <>
                                        <Chip label={`${countSelectedSplitWords}`} size="small" />
                                    </> : <>
                                        <Chip label="При подсчёте произошла ошибка" size="small" />
                                    </>
                                }
                                {
                                    Object.keys(dataCreateTable).length !== 0 ? <>
                                        {
                                            chooseSplitWords.map((item: any) => (
                                                <Chip label={item["org_full_name"]} size="small" />       
                                            ))
                                        }
                                    </> : <></>
                                }
                            </Stack>
                            {
                                countSelectedSplitWords > 0 ? 
                                    <Button variant="contained" color="error" sx={{
                                        marginTop: "15px",
                                        width: "73vW"
                                    }} onClick={() => {
                                        setDataCreateTable([])
                                        setCountSelectedSplitWords(0)
                                    }}>Удалить список</Button> 
                                    : 
                                    <></>
                            }
                        </Box>
                        <Stack spacing={2}>
                            {
                                showSplitWords.map((item: number) => (
                                    <Typography onClick={(event: any) => {
                                        save_data(event.currentTarget)
                                    }} sx={{
                                        cursor: "pointer",
                                        ":hover": {
                                            background: "#f5f5f5"
                                        }
                                    }}>{valueContextFile.join('').split(/,/g)[pagePagination+item]}</Typography>
                                ))
                            }
                            <Typography>Страница: {pagePagination}</Typography>
                            <Pagination count={valueContextFile.length - 10} color="primary" page={pagePagination} onChange={handleChangePagination} />
                        </Stack>
                    </> 
                }
            </>
        )
    }

    const send_data_server = (
        column_value: any,
        id_file: any,
        name_company: any
    ) => {
        if (data === "ExpertOrganization") {
            // dataCreateTable
            let body = {
                "TableName": data,
                "data": {
                    "org_full_name": chooseSplitWords[0]["org_full_name"],
                    "org_ogrn": "",
                    "org_inn": "",
                    "org_kpp": "",
                    "Region": "",
                    "City": "",
                    "Street": "",
                    "Building": "",
                    "Room": ""
                },
                "id_file": id_file,
                "name_company": name_company
            }

            console.log(body)
        }
    }

    if (data === "Approver") {
        return (
            <>
                {
                    dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell id="approver_id_1" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('approver_id_1'))
                            }}></TableCell>
                            <TableCell id="approver_id_2" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('approver_id_2'))
                            }}></TableCell>
                            <TableCell id="approver_id_3" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('approver_id_3'))
                            }}></TableCell>
                            <TableCell id="approver_id_4" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('approver_id_4'))
                            }}></TableCell>
                            <TableCell id="approver_id_5" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('approver_id_5'))
                            }}></TableCell>
                        </TableRow>
                    ))
                }
            </>
        );
    }

    else if (data === "ExpertOrganization") {
        const count_table_cell_expert_organization = [1,2,3,4,5,6,7,8,9,10]

        return (
            <>
                { 
                    <>
                        {
                            dataCellTable.map((item:any) => (
                                <>
                                    <TableRow key={item.name} onClick={() => {
                                        setShowEditor(true)
                                        setOpen(true)
                                    }}>
                                        {
                                            count_table_cell_expert_organization.map(() => (
                                                <TableCell id="expert_organization_id" style={StyleTableCell}></TableCell>
                                            ))
                                        }
                                    </TableRow>
                                    {
                                        showEditor ? <Box sx={{
                                            "margin": "auto"
                                        }}>
                                            <Modal
                                                open={open}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                                style={{
                                                    "position": "absolute",
                                                    "zIndex": "99999",
                                                    "width": "90%",
                                                    "textAlign": "center",
                                                    "background": "aquamarine",
                                                    "height": "88vh",
                                                    "margin": "auto",
                                                    "marginLeft": "50px",
                                                    "borderRadius": "10px",
                                                    "padding": "10px",
                                                    "overflow": "scroll",
                                                    "top": "10%"
                                                }}
                                            >
                                                <Box>
                                                    <Button onClick={() => {
                                                        setOpen(false)
                                                        setShowEditor(false)
                                                    }} sx={{
                                                        "position": "absolute",
                                                        "left": "21px",
                                                        "zIndex": "9",
                                                        "top": "10px"	
                                                    }} variant="contained">Закрыть</Button>
                                                    <div className="hieght"></div>
                                                    <Accordion sx={{
                                                        "marginTop": "60px"
                                                    }} expanded={expanded === 'OrgFullName'} onChange={handleChange('OrgFullName')}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography id="modal-modal-description">OrgFullName</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            {
                                                                fieldNormalShow ? <>
                                                                    <TextField
                                                                        id="outlined-password-input"
                                                                        label="OrgFullName"
                                                                        type="text"
                                                                        autoComplete="current-password"
                                                                        fullWidth
                                                                    />    
                                                                </> : <></>
                                                            }
                                                            {
                                                                fieldBigHieghtShow ? <>
                                                                    <TextField
                                                                        id="outlined-multiline-static"
                                                                        label="OrgFullName"
                                                                        multiline
                                                                        rows={4}
                                                                        fullWidth
                                                                        autoComplete="current-password"
                                                                    /> 
                                                                </> : <></>
                                                            }
                                                            {
                                                                fieldDateShow ? <>
                                                                    <TextField
                                                                        id="outlined-password-input"
                                                                        type="date"
                                                                        autoComplete="current-password"
                                                                        fullWidth
                                                                    />
                                                                </> : <></>
                                                            }
                                                            {
                                                                chooseContextFile ? <>
                                                                    <ChooseContentFromFile/>
                                                                </> : <></>
                                                            }
                                                            <Box sx={{
                                                                "marginTop": "10px",
                                                                "display": "flex",
                                                                "justifyContent": "space-between"
                                                            }}>
                                                                <Tooltip title="Загрузить данные из файла">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('choose data from the file')
                                                                        GetContentFile(selected)
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(true)
                                                                        setPreloadContextFile(true)
                                                                    }}>
                                                                            <Grading/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Саморасширяемое поле ввода (по высоте)">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input textarea')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(true)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <TextFields/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Поле ввода с датой">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(true)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <CalendarToday/>
                                                                        
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Обычное поле ввода">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(true)
                                                                        setChooseContextFile(false)
                                                                    }} sx={{
                                                                        "height": "35px"
                                                                    }}>
                                                                            <Notes/>
                                                                    </Button>
                                                                </Tooltip>
                                                            </Box>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Accordion expanded={expanded === 'OrgOGRN'} onChange={handleChange('OrgOGRN')}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography id="modal-modal-description">OrgOGRN</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <TextField
                                                                id="outlined-password-input"
                                                                label="OrgOGRN"
                                                                type="password"
                                                                autoComplete="current-password"
                                                                sx={{
                                                                    width: "82vW"
                                                                }}
                                                            />
                                                            <Box sx={{
                                                                "marginTop": "10px",
                                                                "display": "flex",
                                                                "justifyContent": "space-between"
                                                            }}>
                                                                <Tooltip title="Загрузить данные из файла">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('choose data from the file')
                                                                        GetContentFile(selected)
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(true)
                                                                        setPreloadContextFile(true)
                                                                    }}>
                                                                            <Grading/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Саморасширяемое поле ввода (по высоте)">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input textarea')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(true)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <TextFields/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Поле ввода с датой">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(true)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <CalendarToday/>
                                                                        
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Обычное поле ввода">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(true)
                                                                        setChooseContextFile(false)
                                                                    }} sx={{
                                                                        "height": "35px"
                                                                    }}>
                                                                            <Notes/>
                                                                    </Button>
                                                                </Tooltip>
                                                            </Box>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Accordion expanded={expanded === 'OrgINN'} onChange={handleChange('OrgINN')}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography id="modal-modal-description">OrgINN</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <TextField
                                                                id="outlined-password-input"
                                                                label="OrgINN"
                                                                type="password"
                                                                autoComplete="current-password"
                                                                sx={{
                                                                    width: "82vW"
                                                                }}
                                                            />
                                                            <Box sx={{
                                                                "marginTop": "10px",
                                                                "display": "flex",
                                                                "justifyContent": "space-between"
                                                            }}>
                                                                <Tooltip title="Загрузить данные из файла">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('choose data from the file')
                                                                        GetContentFile(selected)
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(true)
                                                                        setPreloadContextFile(true)
                                                                    }}>
                                                                            <Grading/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Саморасширяемое поле ввода (по высоте)">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input textarea')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(true)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <TextFields/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Поле ввода с датой">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(true)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <CalendarToday/>
                                                                        
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Обычное поле ввода">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(true)
                                                                        setChooseContextFile(false)
                                                                    }} sx={{
                                                                        "height": "35px"
                                                                    }}>
                                                                            <Notes/>
                                                                    </Button>
                                                                </Tooltip>
                                                            </Box>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Accordion expanded={expanded === 'OrgKPP'} onChange={handleChange('OrgKPP')}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography id="modal-modal-description">OrgKPP</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <TextField
                                                                id="outlined-password-input"
                                                                label="OrgKPP"
                                                                type="password"
                                                                autoComplete="current-password"
                                                                sx={{
                                                                    width: "82vW"
                                                                }}
                                                            />
                                                            <Box sx={{
                                                                "marginTop": "10px",
                                                                "display": "flex",
                                                                "justifyContent": "space-between"
                                                            }}>
                                                                <Tooltip title="Загрузить данные из файла">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('choose data from the file')
                                                                        GetContentFile(selected)
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(true)
                                                                        setPreloadContextFile(true)
                                                                    }}>
                                                                            <Grading/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Саморасширяемое поле ввода (по высоте)">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input textarea')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(true)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <TextFields/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Поле ввода с датой">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(true)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <CalendarToday/>
                                                                        
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Обычное поле ввода">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(true)
                                                                        setChooseContextFile(false)
                                                                    }} sx={{
                                                                        "height": "35px"
                                                                    }}>
                                                                            <Notes/>
                                                                    </Button>
                                                                </Tooltip>
                                                            </Box>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Accordion expanded={expanded === 'Region'} onChange={handleChange('Region')}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography id="modal-modal-description">Region</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <TextField
                                                                id="outlined-password-input"
                                                                label="Region"
                                                                type="password"
                                                                autoComplete="current-password"
                                                                sx={{
                                                                    width: "82vW"
                                                                }}
                                                            />
                                                            <Box sx={{
                                                                "marginTop": "10px",
                                                                "display": "flex",
                                                                "justifyContent": "space-between"
                                                            }}>
                                                                <Tooltip title="Загрузить данные из файла">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('choose data from the file')
                                                                        GetContentFile(selected)
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(true)
                                                                        setPreloadContextFile(true)
                                                                    }}>
                                                                            <Grading/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Саморасширяемое поле ввода (по высоте)">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input textarea')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(true)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <TextFields/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Поле ввода с датой">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(true)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <CalendarToday/>
                                                                        
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Обычное поле ввода">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(true)
                                                                        setChooseContextFile(false)
                                                                    }} sx={{
                                                                        "height": "35px"
                                                                    }}>
                                                                            <Notes/>
                                                                    </Button>
                                                                </Tooltip>
                                                            </Box>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Accordion expanded={expanded === 'City'} onChange={handleChange('City')}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography id="modal-modal-description">City</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <TextField
                                                                id="outlined-password-input"
                                                                label="City"
                                                                type="password"
                                                                autoComplete="current-password"
                                                                sx={{
                                                                    width: "82vW"
                                                                }}
                                                            />
                                                            <Box sx={{
                                                                "marginTop": "10px",
                                                                "display": "flex",
                                                                "justifyContent": "space-between"
                                                            }}>
                                                                <Tooltip title="Загрузить данные из файла">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('choose data from the file')
                                                                        GetContentFile(selected)
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(true)
                                                                        setPreloadContextFile(true)
                                                                    }}>
                                                                            <Grading/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Саморасширяемое поле ввода (по высоте)">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input textarea')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(true)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <TextFields/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Поле ввода с датой">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(true)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <CalendarToday/>
                                                                        
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Обычное поле ввода">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(true)
                                                                        setChooseContextFile(false)
                                                                    }} sx={{
                                                                        "height": "35px"
                                                                    }}>
                                                                            <Notes/>
                                                                    </Button>
                                                                </Tooltip>
                                                            </Box>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Accordion expanded={expanded === 'Street'} onChange={handleChange('Street')}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography id="modal-modal-description">Street</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <TextField
                                                                id="outlined-password-input"
                                                                label="Street"
                                                                type="password"
                                                                autoComplete="current-password"
                                                                sx={{
                                                                    width: "82vW"
                                                                }}
                                                            />
                                                            <Box sx={{
                                                                "marginTop": "10px",
                                                                "display": "flex",
                                                                "justifyContent": "space-between"
                                                            }}>
                                                                <Tooltip title="Загрузить данные из файла">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('choose data from the file')
                                                                        GetContentFile(selected)
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(true)
                                                                        setPreloadContextFile(true)
                                                                    }}>
                                                                            <Grading/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Саморасширяемое поле ввода (по высоте)">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input textarea')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(true)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <TextFields/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Поле ввода с датой">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(true)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <CalendarToday/>
                                                                        
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Обычное поле ввода">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(true)
                                                                        setChooseContextFile(false)
                                                                    }} sx={{
                                                                        "height": "35px"
                                                                    }}>
                                                                            <Notes/>
                                                                    </Button>
                                                                </Tooltip>
                                                            </Box>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Accordion expanded={expanded === 'Building'} onChange={handleChange('Building')}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography id="modal-modal-description">Building</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <TextField
                                                                id="outlined-password-input"
                                                                label="Building"
                                                                type="password"
                                                                autoComplete="current-password"
                                                                sx={{
                                                                    width: "82vW"
                                                                }}
                                                            />
                                                            <Box sx={{
                                                                "marginTop": "10px",
                                                                "display": "flex",
                                                                "justifyContent": "space-between"
                                                            }}>
                                                                <Tooltip title="Загрузить данные из файла">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('choose data from the file')
                                                                        GetContentFile(selected)
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(true)
                                                                        setPreloadContextFile(true)
                                                                    }}>
                                                                            <Grading/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Саморасширяемое поле ввода (по высоте)">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input textarea')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(true)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <TextFields/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Поле ввода с датой">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(true)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <CalendarToday/>
                                                                        
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Обычное поле ввода">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(true)
                                                                        setChooseContextFile(false)
                                                                    }} sx={{
                                                                        "height": "35px"
                                                                    }}>
                                                                            <Notes/>
                                                                    </Button>
                                                                </Tooltip>
                                                            </Box>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Accordion expanded={expanded === 'Room'} onChange={handleChange('Room')}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography id="modal-modal-description">Room</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <TextField
                                                                id="outlined-password-input"
                                                                label="Room"
                                                                type="password"
                                                                autoComplete="current-password"
                                                                sx={{
                                                                    width: "82vW"
                                                                }}
                                                            />
                                                            <Box sx={{
                                                                "marginTop": "10px",
                                                                "display": "flex",
                                                                "justifyContent": "space-between"
                                                            }}>
                                                                <Tooltip title="Загрузить данные из файла">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('choose data from the file')
                                                                        GetContentFile(selected)
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(true)
                                                                        setPreloadContextFile(true)
                                                                    }}>
                                                                            <Grading/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Саморасширяемое поле ввода (по высоте)">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input textarea')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(true)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <TextFields/>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Поле ввода с датой">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(true)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(false)
                                                                        setChooseContextFile(false)
                                                                    }}>
                                                                            <CalendarToday/>
                                                                        
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Обычное поле ввода">
                                                                    <Button variant="contained" onClick={() => {
                                                                        console.log('input with data')
                                                                        setFieldDateShow(false)
                                                                        setFieldBigHieghtShow(false)
                                                                        setFieldNormalShow(true)
                                                                        setChooseContextFile(false)
                                                                    }} sx={{
                                                                        "height": "35px"
                                                                    }}>
                                                                            <Notes/>
                                                                    </Button>
                                                                </Tooltip>
                                                            </Box>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Button variant="contained" sx={{
                                                        marginLeft: 0,
                                                        position: "absolute",
                                                        left: "10px",
                                                        marginTop: "13px"
                                                    }} onClick={() => {
                                                        selected.map((id_file: any) => {
                                                            send_data_server(
                                                                chooseSplitWords,
                                                                id_file,
                                                                localStorage.getItem('NameCompany')
                                                            )
                                                        })
                                                    }}>Сохранить</Button>
                                                </Box>
                                            </Modal>
                                        </Box> : <></>
                                    }
                                </>
                            ))
                        }
                    </>
                }
            </>
        );
    }

    else if (data === "Documents") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="documents_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_1'))
                        }}></TableCell>
                        <TableCell id="documents_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_2'))
                        }}></TableCell>
                        <TableCell id="documents_id_3" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_3'))
                        }}></TableCell>
                        <TableCell id="documents_id_4" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_4'))
                        }}></TableCell>
                        <TableCell id="documents_id_5" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_5'))
                        }}></TableCell>
                        <TableCell id="documents_id_6" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_6'))
                        }}></TableCell>
                        <TableCell id="documents_id_7" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_7'))
                        }}></TableCell>
                        <TableCell id="documents_id_8" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_8'))
                        }}></TableCell>
                        <TableCell id="documents_id_9" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_9'))
                        }}></TableCell>
                        <TableCell id="documents_id_10" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_10'))
                        }}></TableCell>
                        <TableCell id="documents_id_11" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_11'))
                        }}></TableCell>
                        <TableCell id="documents_id_12" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_12'))
                        }}></TableCell>
                        <TableCell id="documents_id_13" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_13'))
                        }}></TableCell>
                        <TableCell id="documents_id_14" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('documents_id_14'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "PreviousConclusions") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="previous_conclusions_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_conclusions_id_1'))
                        }}></TableCell>
                        <TableCell id="previous_conclusions_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_conclusions_id_2'))
                        }}></TableCell>
                        <TableCell id="previous_conclusions_id_3" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_conclusions_id_3'))
                        }}></TableCell>
                        <TableCell id="previous_conclusions_id_4" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_conclusions_id_4'))
                        }}></TableCell>
                        <TableCell id="previous_conclusions_id_5" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_conclusions_id_5'))
                        }}></TableCell>
                        <TableCell id="previous_conclusions_id_6" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_conclusions_id_6'))
                        }}></TableCell>
                        <TableCell id="previous_conclusions_id_7" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_conclusions_id_7'))
                        }}></TableCell>
                        <TableCell id="previous_conclusions_id_8" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_conclusions_id_8'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "PreviousSimpleConclusions") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="previous_simple_conclusions_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_simple_conclusions_id_1'))
                        }}></TableCell>
                        <TableCell id="previous_simple_conclusions_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_simple_conclusions_id_2'))
                        }}></TableCell>
                        <TableCell id="previous_simple_conclusions_id_3" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_simple_conclusions_id_3'))
                        }}></TableCell>
                        <TableCell id="previous_simple_conclusions_id_4" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_simple_conclusions_id_4'))
                        }}></TableCell>
                        <TableCell id="previous_simple_conclusions_id_5" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_simple_conclusions_id_5'))
                        }}></TableCell>
                        <TableCell id="previous_simple_conclusions_id_6" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_simple_conclusions_id_6'))
                        }}></TableCell>
                        <TableCell id="previous_simple_conclusions_id_7" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_simple_conclusions_id_7'))
                        }}></TableCell>
                        <TableCell id="previous_simple_conclusions_id_8" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('previous_simple_conclusions_id_8'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "Object") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="object_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('object_id_1'))
                        }}></TableCell>
                        <TableCell id="object_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('object_id_2'))
                        }}></TableCell>
                        <TableCell id="object_id_3" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('object_id_3'))
                        }}></TableCell>
                        <TableCell id="object_id_4" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('object_id_4'))
                        }}></TableCell>
                        <TableCell id="object_id_5" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('object_id_5'))
                        }}></TableCell>
                        <TableCell id="object_id_6" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('object_id_6'))
                        }}></TableCell>
                        <TableCell id="object_id_7" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('object_id_7'))
                        }}></TableCell>
                        <TableCell id="object_id_8" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('object_id_8'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "Declarant") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="declarant_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('declarant_id_1'))
                        }}></TableCell>
                        <TableCell id="declarant_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('declarant_id_2'))
                        }}></TableCell>
                        <TableCell id="declarant_id_3" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('declarant_id_3'))
                        }}></TableCell>
                        <TableCell id="declarant_id_4" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('declarant_id_4'))
                        }}></TableCell>
                        <TableCell id="declarant_id_5" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('declarant_id_5'))
                        }}></TableCell>
                        <TableCell id="declarant_id_6" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('declarant_id_6'))
                        }}></TableCell>
                        <TableCell id="declarant_id_7" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('declarant_id_7'))
                        }}></TableCell>
                        <TableCell id="declarant_id_8" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('declarant_id_8'))
                        }}></TableCell>
                        <TableCell id="declarant_id_9" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('declarant_id_9'))
                        }}></TableCell>
                        <TableCell id="declarant_id_10" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('declarant_id_10'))
                        }}></TableCell>
                        <TableCell id="declarant_id_11" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('declarant_id_11'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "ProjectDocumentsDeveloper") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="project_documents_developer_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('project_documents_developer_id_1'))
                        }}></TableCell>
                        <TableCell id="project_documents_developer_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('project_documents_developer_id_2'))
                        }}></TableCell>
                        <TableCell id="project_documents_developer_id_3" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('project_documents_developer_id_3'))
                        }}></TableCell>
                        <TableCell id="project_documents_developer_id_4" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('project_documents_developer_id_4'))
                        }}></TableCell>
                        <TableCell id="project_documents_developer_id_5" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('project_documents_developer_id_5'))
                        }}></TableCell>
                        <TableCell id="project_documents_developer_id_6" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('project_documents_developer_id_6'))
                        }}></TableCell>
                        <TableCell id="project_documents_developer_id_7" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('project_documents_developer_id_7'))
                        }}></TableCell>
                        <TableCell id="project_documents_developer_id_8" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('project_documents_developer_id_8'))
                        }}></TableCell>
                        <TableCell id="project_documents_developer_id_9" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('project_documents_developer_id_9'))
                        }}></TableCell>
                        <TableCell id="project_documents_developer_id_10" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('project_documents_developer_id_10'))
                        }}></TableCell>
                        <TableCell id="project_documents_developer_id_11" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('project_documents_developer_id_11'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "Finance") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="finance_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('finance_id_1'))
                        }}></TableCell>
                        <TableCell id="finance_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('finance_id_2'))
                        }}></TableCell>
                        <TableCell id="finance_id_3" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('finance_id_3'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "ClimateConditions") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="climate_conditions_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_id_1'))
                        }}></TableCell>
                        <TableCell id="climate_conditions_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_id_2'))
                        }}></TableCell>
                        <TableCell id="climate_conditions_id_3" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_id_3'))
                        }}></TableCell>
                        <TableCell id="climate_conditions_id_4" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_id_4'))
                        }}></TableCell>
                        <TableCell id="climate_conditions_id_5" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_id_5'))
                        }}></TableCell>
                        <TableCell id="climate_conditions_id_6" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_id_6'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "ClimateConditionsNote") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="climate_conditions_note_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_note_id_1'))
                        }}></TableCell>
                        <TableCell id="climate_conditions_note_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_note_id_2'))
                        }}></TableCell>
                        <TableCell id="climate_conditions_note_id_3" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_note_id_3'))
                        }}></TableCell>
                        <TableCell id="climate_conditions_note_id_4" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_note_id_4'))
                        }}></TableCell>
                        <TableCell id="climate_conditions_note_id_5" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_note_id_5'))
                        }}></TableCell>
                        <TableCell id="climate_conditions_note_id_6" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('climate_conditions_note_id_6'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "CadastralNumber") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="cadastral_number_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('cadastral_number_id_1'))
                        }}></TableCell>
                        <TableCell id="cadastral_number_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('cadastral_number_id_2'))
                        }}></TableCell>
                        <TableCell id="cadastral_number_id_3" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('cadastral_number_id_3'))
                        }}></TableCell>
                        <TableCell id="cadastral_number_id_4" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('cadastral_number_id_4'))
                        }}></TableCell>
                        <TableCell id="cadastral_number_id_5" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('cadastral_number_id_5'))
                        }}></TableCell>
                        <TableCell id="cadastral_number_id_6" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('cadastral_number_id_6'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "ExpertProjectDocuments") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="expert_project_documents_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('expert_project_documents_id_1'))
                        }}></TableCell>
                        <TableCell id="expert_project_documents_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('expert_project_documents_id_2'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "Experts") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="experts_id_1" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('experts_id_1'))
                        }}></TableCell>
                        <TableCell id="experts_id_2" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('experts_id_2'))
                        }}></TableCell>
                        <TableCell id="experts_id_3" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('experts_id_3'))
                        }}></TableCell>
                        <TableCell id="experts_id_4" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('experts_id_4'))
                        }}></TableCell>
                        <TableCell id="experts_id_5" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('experts_id_5'))
                        }}></TableCell>
                        <TableCell id="experts_id_6" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('experts_id_6'))
                        }}></TableCell>
                        <TableCell id="experts_id_7" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('experts_id_7'))
                        }}></TableCell>
                        <TableCell id="experts_id_8" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('experts_id_8'))
                        }}></TableCell>
                        <TableCell id="experts_id_9" style={StyleTableCell} onClick={() => {
                            EditEmptyFields(document.getElementById('experts_id_9'))
                        }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else if (data === "Designer") {
        return (
            <>
                {
                    dataCellTable.map((item:any) => (
                        <TableRow key={item.name}>
                            <TableCell id="designer_id_1" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_1'))
                            }}></TableCell>
                            <TableCell id="designer_id_2" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_2'))
                            }}></TableCell>
                            <TableCell id="designer_id_3" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_3'))
                            }}></TableCell>
                            <TableCell id="designer_id_4" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_4'))
                            }}></TableCell>
                            <TableCell id="designer_id_5" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_5'))
                            }}></TableCell>
                            <TableCell id="designer_id_6" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_6'))
                            }}></TableCell>
                            <TableCell id="designer_id_7" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_7'))
                            }}></TableCell>
                            <TableCell id="designer_id_8" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_8'))
                            }}></TableCell>
                            <TableCell id="designer_id_9" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_9'))
                            }}></TableCell>
                        </TableRow>
                    ))
                }
            </>
        );
    }

    else if (data === "Summary") {
        return (
            <>
                {dataCellTable.map((item:any) => (
                    <TableRow key={item.name}>
                        <TableCell id="designer_id_1" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_1'))
                            }}></TableCell>
                        <TableCell id="designer_id_2" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_2'))
                            }}></TableCell>
                        <TableCell id="designer_id_3" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_3'))
                            }}></TableCell>
                        <TableCell id="designer_id_4" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_4'))
                            }}></TableCell>
                        <TableCell id="designer_id_5" style={StyleTableCell} onClick={() => {
                                EditEmptyFields(document.getElementById('designer_id_5'))
                            }}></TableCell>
                    </TableRow>
                ))}
            </>
        );
    }

    else return(<>Произошла ошибка</>);
}