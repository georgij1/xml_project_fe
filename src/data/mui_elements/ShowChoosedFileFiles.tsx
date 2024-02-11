import {Typography} from "@mui/material";

export const ShowChoosedFileFiles = (
	props: any
) => {
	const { numSelected } = props

	return (
		<Typography
	        sx={{ flex: '1 1 100%' }}
	        color="inherit"
	        variant="subtitle1"
	        component="div"
	    >
	        {numSelected === 1 ? <>1 выбран</> : <>{numSelected} выбрано</>}
	    </Typography>
	)
}