import { NoContentTable } from "../mui_elements/NoContentTable";
import { Toolbar } from "@mui/material";
import { ChoosedManyElements } from "../CustomsElements/ChoosedManyElements";
import { ChoosedOneElement } from "../CustomsElements/ChoosedOneElement";
import { NoBodyChoosedFile } from "../mui_elements/NoBodyChoosedFile";
import { ShowChoosedFileFiles } from "../mui_elements/ShowChoosedFileFiles";
import React from "react";
import { alpha } from "@mui/material";
import { EnhancedTableToolbarProps } from "../interface/EnhancedTableToolbarProps";

interface PropsEnhancedTableToolbar {
	numSelected: any,
	setOpen: any,
	setOpenWordFile: any,
	test_api: any,
	port_server: any,
	deploy_api: any,
	setContentFile: any,
	selected: any,
	setIsLoadingXMLTables: any,
	setArr_count_tables_xml_settings: any,
	setArr_count_tables_xml: any,
	numSettings: any,
	numTables: any,
	Arr_count_tables_xml_settings: any,
	setIsLoading: any,
	setOpenXMLFile: any,
	setOpenPDFFile: any,
	options: any,
	foundFile: any
}

export const EnhancedTableToolbar = (
	{
		numSelected,
		setOpen,
		setOpenWordFile,
		test_api,
		port_server,
		deploy_api,
		setContentFile,
		selected,
		setIsLoadingXMLTables,
		setArr_count_tables_xml_settings,
		setArr_count_tables_xml,
		numSettings,
		numTables,
		Arr_count_tables_xml_settings,
		setIsLoading,
		setOpenXMLFile,
		setOpenPDFFile,
		options,
		foundFile
	}: PropsEnhancedTableToolbar
) => {
    const [open, setOpen_1] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

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
            {numSelected > 0 && foundFile === true && numSelected !== "" ? <ShowChoosedFileFiles numSelected={numSelected}/> : <NoBodyChoosedFile/>}
            {numSelected > 0 ? 
                <> {numSelected === 1 ? <>
                    <ChoosedOneElement 
                        options={options}
                        setOpenPDFFile={setOpenPDFFile}
                        setOpenXMLFile={setOpenXMLFile}
                        setIsLoading={setIsLoading}
                        Arr_count_tables_xml_settings={Arr_count_tables_xml_settings}
                        numTables={numTables}
                        numSettings={numSettings}
                        setArr_count_tables_xml={setArr_count_tables_xml}
                        setArr_count_tables_xml_settings={setArr_count_tables_xml_settings}
                        setIsLoadingXMLTables={setIsLoadingXMLTables} 
                        selected={selected}
                        setContentFile={setContentFile}
                        deploy_api={deploy_api}
                        port_server={port_server}
                        test_api={test_api}
                        setOpenWordFile={setOpenWordFile}
                        selectedIndex={selectedIndex}
                        setOpen_1={setOpen_1}
                        setSelectedIndex={setSelectedIndex}
                        open={open}
                        setOpen={setOpen}
                    />
                </> : <ChoosedManyElements/>
            }
                </>
            : <NoContentTable/>}
        </Toolbar>
    );
}