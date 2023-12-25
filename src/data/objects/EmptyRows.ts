import { rows } from "./CreateDataTable";
// import { page, rowsPerPage } from "./TableSettingsObjects";

export const emptyRows = (
    page: number,
    rowsPerPage: number
) => page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;