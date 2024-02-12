import { Child } from "../CustomsElements/Child";

interface PropsParent {
    data: any
    dataCellTable: any
}

export const Parent = (
    {
        data, 
        dataCellTable
    }: PropsParent
) => {
    console.log(data)
    return (<Child data={data} dataCellTable={dataCellTable} />);
}