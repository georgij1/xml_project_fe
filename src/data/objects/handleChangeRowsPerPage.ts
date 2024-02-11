export const handleChangeRowsPerPage = (
	event: React.ChangeEvent<HTMLInputElement>,
	setRowsPerPage: any,
	setPage: any
) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};