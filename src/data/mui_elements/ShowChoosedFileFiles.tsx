import {Typography} from "@mui/material";

interface ShowChoosedFileFilesProps {
	numSelected: number
}

export const ShowChoosedFileFiles = (
	{
		numSelected
	}: ShowChoosedFileFilesProps
) => {
	return (
		<Typography
	        sx={{ flex: '1 1 100%' }}
	        color="inherit"
	        variant="subtitle1"
	        component="div"
	    >
	        {numSelected === (1 || 0) ? <>1 выбран</> : <>{numSelected} выбрано</>}
	    </Typography>
	)
}