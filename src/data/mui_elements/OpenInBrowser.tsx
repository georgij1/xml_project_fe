import { Tooltip, IconButton } from "@mui/material";
import { GetWordFile_1 } from "../../data/api/file/GetWordFile_1";
import DeleteIcon from '@mui/icons-material/Delete';
import {
	OpenInBrowser
} from "@mui/icons-material";

interface PramOpenInBrowser {
	deploy_api: any;
	port_server: any;
	test_api: any;
	selected: any;
	setContentFile: any;
	setIsLoading: any;
	setOpen: any;
}

export const OpenInBrowserMUI = (
	{
		deploy_api,
		port_server,
		test_api,
		selected,
		setContentFile,
		setIsLoading,
		setOpen
	}: PramOpenInBrowser
) => {
	return (
		<Tooltip title="Открыть в браузере" onClick={() => {
            GetWordFile_1(
                selected, 
                setContentFile,
                setIsLoading, 
                deploy_api, 
                port_server, 
                test_api, 
                setOpen
            )
        }}>
            <IconButton>
                <OpenInBrowser />
            </IconButton>
        </Tooltip>
	)
}