import { Tooltip, IconButton } from "@mui/material";
import { DeleteArrayFiles } from "../../data/api/file/DeleteArrayFiles";
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteArrayFilesMUI = () => {
    return  (
        <Tooltip title="Удалить" onClick={() => DeleteArrayFiles()}>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    )
}