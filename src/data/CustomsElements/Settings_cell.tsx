import {
	Box,
	Tooltip,
	Fab
} from "@mui/material";
import { 
	Delete,
	Edit,
	Add
} from "@mui/icons-material";
import { remove_data_table_xml } from "../objects/remove_data_table_xml";
import { edit_cell_table_xml } from "../objects/edit_cell_table_xml";
import { addDataCellTable } from "../objects/addDataCellTable";

interface PropsSettings_cell {
	setDataCellTable: any;
	dataCellTable: any;
	setOpenChooseString: any;
}

export const Settings_cell = (
	{
		setDataCellTable,
		dataCellTable,
		setOpenChooseString
	}: PropsSettings_cell
) => {
    return (
        <Box style={StyleSettingsCell}>
            <Tooltip title="Добавить">
                <Fab sx={{
                    marginTop: "10px",
                    borderRadius: '10px',
                    gap: '5px'
                }} size="medium" color="info" aria-label="add" onClick={() => addDataCellTable(setDataCellTable, dataCellTable)}>
                    <Add />
                </Fab>    
            </Tooltip>
            <Tooltip title="Изменить">
                <Fab sx={{
                    marginTop: "10px",
                    borderRadius: '10px',
                    gap: '5px'
                }} size="medium" color="info" aria-label="edit" onClick={() => edit_cell_table_xml(setOpenChooseString)}>
                    <Edit />
                </Fab>    
            </Tooltip>
            <Tooltip title="Удалить">
                <Fab sx={{
                    marginTop: "10px",
                    borderRadius: '10px',
                    gap: '5px'
                }} size="medium" color="info" aria-label="add" onClick={() => remove_data_table_xml(setDataCellTable)}>
                    <Delete />
                </Fab>
            </Tooltip>
        </Box>
    )
}