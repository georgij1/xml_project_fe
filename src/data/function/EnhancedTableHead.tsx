import "@mui/material/Checkbox";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { EnhancedTableProps } from "../interface/DataEnhancedTableProps";
import { headCells } from "../objects/HeadCells";

export function EnhancedTableHead(props: EnhancedTableProps) {
        const { onSelectAllClick, numSelected, rowCount, foundFileEnhancedTableHead } = props;
        
        return (
            <TableHead>
                    <TableRow>
                        {
                            foundFileEnhancedTableHead === true ?
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={numSelected > 0 && numSelected < rowCount}
                                        checked={rowCount > 0 && numSelected === rowCount}
                                        onChange={onSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                            : <></>
                        }
                        {foundFileEnhancedTableHead === true ? <>
                            {headCells.map((headCell) => (
                                <TableCell key={headCell.label}>{headCell.label}</TableCell>
                            ))}
                        </> : <>{null}</>}
                    </TableRow>
                </TableHead>
        );
    }