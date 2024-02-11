import { DeleteButton } from "../mui_elements/DeleteButton";
import { OpenInBrowserMUI } from "../mui_elements/OpenInBrowser";
import { MenuListTypeFiles } from "../mui_elements/MenuListTypeFiles";
import { CollectPacketDocument } from "../mui_elements/CollectPacketDocument";

interface PropsOneElement {
	options: any;
	setOpenPDFFile: any; 
	setOpenXMLFile: any;
	setIsLoading: any;
	Arr_count_tables_xml_settings: any;
	numTables: any;
	numSettings: any;
	setArr_count_tables_xml: any;
	setArr_count_tables_xml_settings: any;
	setIsLoadingXMLTables: any;
	selected: any;
	setContentFile: any;
	deploy_api: any;
	port_server: any;
	test_api: any;
	setOpenWordFile: any;
	selectedIndex: any;
	setOpen_1: any;
	setSelectedIndex: any;
	open: any;
	setOpen: any;
}

export const ChoosedOneElement = (
	{
		options, 
		setOpenPDFFile, 
		setOpenXMLFile, 
		setIsLoading, 
		Arr_count_tables_xml_settings, 
		numTables, 
		numSettings, 
		setArr_count_tables_xml, 
		setArr_count_tables_xml_settings, 
		setIsLoadingXMLTables, 
		selected, 
		setContentFile, 
		deploy_api, 
		port_server, 
		test_api, 
		setOpenWordFile, 
		selectedIndex,
		setOpen_1,
		setSelectedIndex,
		open,
		setOpen
	}: PropsOneElement
) => {
	return (
		<>
			<CollectPacketDocument/>
	        <OpenInBrowserMUI deploy_api={deploy_api} port_server={port_server} test_api={test_api} selected={selected} setContentFile={setContentFile} setIsLoading={setIsLoading} setOpen={setOpen}/>
	        <MenuListTypeFiles options={options} setOpenPDFFile={setOpenPDFFile} setOpenXMLFile={setOpenXMLFile} setIsLoading={setIsLoading} Arr_count_tables_xml_settings={Arr_count_tables_xml_settings} numTables={numTables} numSettings={numSettings} setArr_count_tables_xml={setArr_count_tables_xml} setArr_count_tables_xml_settings={setArr_count_tables_xml_settings} setIsLoadingXMLTables={setIsLoadingXMLTables} selected={selected} setContentFile={setContentFile} deploy_api={deploy_api} port_server={port_server} test_api={test_api} setOpenWordFile={setOpenWordFile} selectedIndex={selectedIndex} setOpen_1={setOpen_1} setSelectedIndex={setSelectedIndex} open={open}/>
	        <DeleteButton deploy_api={deploy_api} port_server={port_server} test_api={test_api} selected={selected}/>
		</>
	)
}