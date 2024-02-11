import { IconButton } from "@mui/material";
import React from "react";
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import {
	Paper
} from "@mui/material";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { handleClick_start } from "../../data/objects/handleClick";
import { handleMenuItemClick } from "../../data/objects/handleMenuItemClick";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { handleToggle } from "../../data/objects/handleToggle";

interface PropsListTypeFiles {
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
}

export const MenuListTypeFiles = (
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
		open
	}: PropsListTypeFiles
) => {
	const handleClose = (event: Event) => {
        if (anchorRef.current?.contains(event.target as HTMLElement)) return;
        setOpen_1(false);
    };
    const anchorRef = React.useRef<HTMLDivElement>(null);

	return (
		<IconButton>
            <React.Fragment>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button onClick={() => handleClick_start(options, setOpenPDFFile, setOpenXMLFile, setIsLoading, Arr_count_tables_xml_settings, numTables, numSettings, setArr_count_tables_xml, setArr_count_tables_xml_settings, setIsLoadingXMLTables, selected, setContentFile, deploy_api, port_server, test_api, setOpenWordFile, selectedIndex)} style={{textTransform:'none'}}>{options[selectedIndex]}</Button>
                    <Button size="small" aria-controls={open ? 'split-button-menu' : undefined} aria-expanded={open ? 'true' : undefined} aria-label="select merge strategy" aria-haspopup="menu" onClick={() => handleToggle(setOpen_1)}>
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper sx={{zIndex: 1}} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                        >
                            <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                {options.map((option: any, index: any) => (
                                    <MenuItem key={option} disabled={index===0} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(index, setSelectedIndex, setOpen_1)}>{option}</MenuItem>
                                ))}
                                </MenuList>
                            </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </React.Fragment>
        </IconButton>
	)
}