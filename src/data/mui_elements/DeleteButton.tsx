import { Tooltip, IconButton } from "@mui/material";
import { DeleteFile } from "../../data/api/file/DeleteFile";
import DeleteIcon from '@mui/icons-material/Delete';

interface PramDelteButton {
	deploy_api: any;
	port_server: any;
	test_api: any;
	selected: any;
}

export const DeleteButton = (
	{
		deploy_api,
		port_server,
		test_api,
		selected
	}: PramDelteButton
) => {
	return (
		<Tooltip title="Удалить" onClick={() => DeleteFile(deploy_api, port_server, test_api, selected)}>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
	)
}