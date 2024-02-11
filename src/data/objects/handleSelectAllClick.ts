export const handleSelectAllClick = (
	setSelected: any,
	files: any,
	event: any
) => {
    if (event.target.checked) {
        const newSelected = files.map((n: any) => n["id_file"]);
        setSelected(newSelected);
        return;
    }
    setSelected([]);
}