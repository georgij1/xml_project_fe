import { GetPdfFile } from "../api/file/GetPdfFile";
import { GetXmlFile } from "../api/file/GetXmlFile";
import { GetWordFile } from "../api/file/GetWordFile";

export const handleClick_start = (
    options: any,
    setOpenPDFFile: any, 
    setOpenXMLFile: any, 
    setIsLoading: any, 
    Arr_count_tables_xml_settings: any,
    numTables: any, 
    numSettings: any, 
    setArr_count_tables_xml: any, 
    setArr_count_tables_xml_settings: any, 
    setIsLoadingXMLTables: any,
    selected: any, 
    setContentFile: any, 
    deploy_api: any, 
    port_server: any, 
    test_api: any,
    setOpenWordFile: any,
    selectedIndex: any
) => {
    console.info(`You clicked ${options[selectedIndex]}`);
    if (options[selectedIndex] === "Просмотреть как PDF") {
        GetPdfFile(setOpenPDFFile, selected, setContentFile, setIsLoading, deploy_api, port_server, test_api)
    }

    else if (options[selectedIndex] === "Просмотреть как XML") {
        GetXmlFile(setOpenXMLFile, selected, setContentFile, setIsLoading, deploy_api, port_server, Arr_count_tables_xml_settings, test_api, numTables, numSettings, setArr_count_tables_xml, setArr_count_tables_xml_settings, setIsLoadingXMLTables)
    }

    else if (options[selectedIndex] === "Просмотреть как Word файл") {
        GetWordFile(selected, setContentFile, setIsLoading, deploy_api, port_server, test_api, setOpenWordFile)
    }
};