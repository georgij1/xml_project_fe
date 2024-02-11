import { Data } from "../interface/DataTableFiles";

export const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
    setOrder: any,
    setOrderBy: any,
    order: any,
    orderBy: any
) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
};