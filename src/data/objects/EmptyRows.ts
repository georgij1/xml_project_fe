export const emptyRows = (
    page: number,
    rowsPerPage: number,
    rows: any
) => page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;