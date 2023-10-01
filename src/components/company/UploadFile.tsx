import "./UploadFile.css"
import React, {useState} from "react";
import {ClipLoader} from "react-spinners";

export const UploadFile: React.FunctionComponent = () => {
    const [classes, setClasses] = useState<string>('')
    const [classes_type_false_file, setClassesTypeFalseFile] = useState<string>('')
    const [ClassesContinue, setClassesContinue] = useState<string>('')
    const [ChooseFile, setChooseFile] = useState<string>('')
    const [CancelBtn, setCancelBtn] = useState<string>('')

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

    const activate_loader = () => {
        // @ts-ignore
        document.querySelector('.loader').style.display = 'inline-block'
        // @ts-ignore
        document.querySelector('.loader').style.width = '150px'
        // @ts-ignore
        document.querySelector('.loader').style.height = '150px'
        // @ts-ignore
        document.querySelector('.loader').style.borderRadius = '100%'
        // @ts-ignore
        document.querySelector('.loader').style.borderColor = 'blue blue transparent'
        // @ts-ignore
        document.querySelector('.loader').style.borderImage = 'initial'
        // @ts-ignore
        document.querySelector('.loader').style.borderStyle = 'solid'
        // @ts-ignore
        document.querySelector('.loader').style.animation = '0.75s linear infinite normal both running react-spinners-ClipLoader-clip'
        // @ts-ignore
        document.querySelector('.loader').style.margin = 'auto'
        // @ts-ignore
        document.querySelector('.loader').style.position = 'absolute'
        // @ts-ignore
        document.querySelector('body').style.overflow='hidden'
        // @ts-ignore
        document.querySelector('body').style.opacity='0.5'
    }

    const distinctive_loader = () => {
        // @ts-ignore
        document.querySelector('.loader').style.display = 'none'
        // @ts-ignore
        document.querySelector('body').style.opacity = '1'
        // @ts-ignore
        document.querySelector('body').style.overflow = 'auto'
    }

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        activate_loader()

        const files = event.currentTarget.files;
        [].forEach.call(files, file => {
            console.log(file)

            const data_file: File = {
                name: file["name"],
                size: file["size"],
                type: file["type"]
            }

            // @ts-ignore
            if (file["type"].includes('xml')) {
                console.log('file is xml')
                setClasses('flex')
                setNameFile(data_file.name)
                setClassesContinue('block')
                setChooseFile('none')
                setCancelBtn('flex')
                setSize(data_file.size)
                setType(data_file.type)
                distinctive_loader()
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
                setCancelBtn('flex')
                distinctive_loader()
            }
        });
    }

    const cancel_btn = () => {
        window.location.reload()
    }

    const ContinueUploadFile = () => {
        activate_loader()
        // distinctive_loader()
    }

    return(
        <div>
            <label htmlFor="choose_file" className={"btn_upload_file " + ChooseFile}>Выбрать файл</label>

            <input type="file"
                   className="input_file"
                   id="choose_file"
                onChangeCapture={handleChangeFile}
            />

            <div className="checks">
                <div className={"check_type_file " + classes}>
                    <div className="success"></div>
                    <div className="title_check">Файл является валидным</div>
                </div>
                
                <div className={"check_type_file " + classes}>
                    <div className="success"></div>
                    <div className="title_check">Имя файла {nameFile}</div>
                </div>

                <div className={"check_type_file " + classes}>
                    <div className="success"></div>
                    <div className="title_check">Размер файла: {size}</div>
                </div>

                <div className={"check_type_file " + classes}>
                    <div className="success"></div>
                    <div className="title_check">Тип файла: {type}</div>
                </div>

                <div className={"check_type_file " + classes_type_false_file}>
                    <div className="error"></div>
                    <div className="title_check">{type}</div>
                </div>

                <div className="flex_768">
                    <div className={"continue_btn " + ClassesContinue} onClick={ContinueUploadFile}>Продолжить</div>
                    <div className={"cancel_btn " + CancelBtn} onClick={cancel_btn}>Отмена</div>
                </div>
            </div>

            <ClipLoader
                style={{display: "none"}}
                color={'blue'}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="loader"
            />
        </div>
    )
}