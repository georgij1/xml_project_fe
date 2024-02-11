import { Order } from "../Type/TypeSortTable";
import { Data } from "./DataTableFiles";

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    foundFileEnhancedTableHead: boolean;
}