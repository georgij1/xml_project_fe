export const handleChange = (panel: string, newExpanded: boolean, setExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
};