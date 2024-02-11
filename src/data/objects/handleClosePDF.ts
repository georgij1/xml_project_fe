export const handleClosePDF = (
	setOpenPDFFile: any,
    setContentFile: any,
    setVisiualCard: any,
    setClickCardData: any,
    setArr_count_head_xml: any,
    setArr_count_columns_xml: any,
    setOpenChooseString: any,
    setComponentTableName_1: any,
    setComponentTableName: any,
    setCloseListItemTables: any
) => {
    setOpenPDFFile(false)
    setContentFile([])
    setVisiualCard(true)
    setClickCardData([])
    setArr_count_head_xml([])
    setArr_count_columns_xml([])
    setOpenChooseString(false)
    setComponentTableName_1([])
    setComponentTableName([])
    setCloseListItemTables(false)
}