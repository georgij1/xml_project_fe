import "./UploadFile.css"
import React, {useState} from "react";
import {Logout} from "../../message/Logout";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button } from "@mui/material";

export const UploadFile: React.FunctionComponent = () => {
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

    const [classes, setClasses] = useState<string>('')
    const [classes_type_false_file, setClassesTypeFalseFile] = useState<string>('')
    const [ChooseFile, setChooseFile] = useState<string>('')

    interface File {
        name: string
        size: string
        type: string
    }

    interface FileTypeError {
        name: string
        size: string
        type: string
    }

    const [nameFile, setNameFile] = useState('');
    const [size, setSize] = useState('');
    const [type, setType] = useState('');
    const form_data = new FormData()

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;
        [].forEach.call(files, file => {
            console.log(file)

            const data_file: File = {
                name: file["name"],
                size: file["size"],
                type: file["type"]
            }

            console.log(data_file)

            if (file["type"] === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                setClasses('flex')
                setNameFile(data_file.name)
                setChooseFile('none')
                setSize(data_file.size)
                setType(data_file.type)

                const ContinueUploadFile = () => {
                    form_data.append("files", file)
                    form_data.append("NameCompany", `${localStorage.getItem('NameCompany')}`)
                    form_data.append("Author", `${localStorage.getItem('login')}`)
                    form_data.append("TimeStamp", `${new Date().getHours()}:`+`${new Date().getMinutes()}:`+`${new Date().getSeconds()}`)
                    form_data.append("TypeFile", `${file["type"]}`)

                    fetch(`http://10.3.9.83:8080/file/upload`, {
                        method: 'POST',
                        body: form_data,
                        headers: {
                            "Accept": "*/*",
                            "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                            'Connection': 'keep-alive',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Cache-Control': 'no-cache'
                        },
                        mode: 'no-cors'
                    })
                        .then((resp) => {
                            console.log(resp.body)
                            console.log(resp.status)

                            if (resp.status === 0 || 200) {
                                SetSuccessResult('flex')
                            }

                            else {
                                alert('Ошибка. Код ошибки: ' + resp.status)
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }

                ContinueUploadFile()
            }

            else {
                console.log('file with type ', file["type"])
                const data_file: FileTypeError = {
                    name: file["name"],
                    size: file["size"],
                    type: "Такой тип не возможен"
                }
                setClassesTypeFalseFile('flex')
                setType(data_file.type)
                setChooseFile('none')
                SetReloadPage('flex')
            }
        });
    }

    const style = {
        "display": "flex",
        "align-items": "center",
        "justify-content": "center",
        "margin": 'auto',
        "height": '70vh'
    }

    const styleChoosedFile = {
        "display": ChooseFile
    }

    const [SuccessResult, SetSuccessResult] = useState<string>('none')
    const [ReloadPage, SetReloadPage] = useState<string>('none')

    const styleToolsUpload = {
        "display": SuccessResult,
        "align-items": "center",
        "justify-content": "center",
        "margin": 'auto'
    }

    const styleCancelBtn = {
        "align-items": "center",
        "justify-content": "center",
        "margin": 'auto'
    }

    const styleContinueBtn = {
        "align-items": "center",
        "justify-content": "center",
        "margin": 'auto'
    }

    const styleReloadPage = {
        "display": ReloadPage
    }

    return(
        <>
            <Box sx={style}>
                <Logout/>
                <ThemeProvider theme={theme}>
                    <CssBaseline />

                    <Button variant="contained" component="label" sx={styleChoosedFile}>
                        Выбрать файл
                        <input
                            type="file"
                            name="file"
                            onChangeCapture={handleChangeFile}
                            hidden
                        />
                    </Button>

                    <Box>
                        <div className={"hidden shadow-black shadow-2xl m-10 items-center gap-5 p-5 rounded-lg " + classes}>
                            <div className="success"></div>
                            <div className="title_check">Файл является валидным</div>
                        </div>

                        <div className={"hidden shadow-black shadow-2xl m-10 items-center gap-5 p-5 rounded-lg " + classes}>
                            <div className="success"></div>
                            <div className="title_check">Имя файла: {nameFile}</div>
                        </div>

                        <div className={"hidden shadow-black shadow-2xl m-10 items-center gap-5 p-5 rounded-lg " + classes}>
                            <div className="success"></div>
                            <div className="title_check">Размер файла: {size}</div>
                        </div>

                        <div className={"hidden shadow-black shadow-2xl m-10 items-center gap-5 p-5 rounded-lg " + classes}>
                            <div className="success"></div>
                            <div className="title_check">Тип файла: {type}</div>
                        </div>

                        <div className={"hidden shadow-black shadow-2xl m-10 items-center gap-5 p-5 rounded-lg " + classes_type_false_file}>
                            <div className="error"></div>
                            <div className="title_check">{type}</div>
                        </div>
                    </Box>
                </ThemeProvider>
            </Box>

            <Box sx={styleToolsUpload}>
                <Button variant="contained" sx={styleContinueBtn} onClick={() => window.open('/home/company', '_self')}>К списку файлов</Button>
                
            </Box>

            <Box sx={styleReloadPage}>
                <Button variant="contained" sx={styleCancelBtn} onClick={() => window.location.reload()}>Отмена</Button>
            </Box>
        </>
    )
}