import "@mui/material/Checkbox";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { EnhancedTableProps } from "../interface/DataEnhancedTableProps";
import { headCells } from "../objects/HeadCells";

export const EnhancedTableHead = (props: EnhancedTableProps) => {
    const { onSelectAllClick, numSelected, rowCount, onRequestSort } = props;

    return (
        <TableHead>
                <TableRow>
                    {
                        // foundFile === true ?
                        //     <TableCell padding="checkbox">
                        //         <Checkbox
                        //             color="primary"
                        //             indeterminate={numSelected > 0 && numSelected < rowCount}
                        //             checked={rowCount > 0 && numSelected === rowCount}
                        //             onChange={onSelectAllClick}
                        //             inputProps={{
                        //                 'aria-label': 'select all desserts',
                        //             }}
                        //         />
                        //     </TableCell>
                        // : <>{null}</>
                    }
                    {/* {foundFile === true ? <>
                        {headCells.map((headCell:any) => (
                            <TableCell key={headCell.id}>{headCell.label}</TableCell>
                        ))}
                    </> : <>{null}</>} */}
                </TableRow>
            </TableHead>
    );
}