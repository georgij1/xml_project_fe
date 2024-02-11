import { 
	Tooltip, 
	IconButton 
} from "@mui/material";
import { 
	NoteAdd, 
	CloudUpload 
} from "@mui/icons-material";

export const NoContentTable = () => {
	return (
		<>
			<Tooltip title="Создать" onClick={() => {window.open(`/home/company/create/file`, '_self')}}>
	            <IconButton>
	                <NoteAdd />
	            </IconButton>
	        </Tooltip>

	        <Tooltip title="Загрузить" onClick={() => {window.open(`/home/company/upload/file`, '_self')}}>
	            <IconButton>
	                <CloudUpload />
	            </IconButton>
	        </Tooltip>
        </>
	)
}