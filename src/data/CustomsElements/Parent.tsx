import { Child } from "../CustomsElements/Child";

interface PropsParent {
    data: any;
    dataCellTable: any;
    selected: any;
}

export const Parent = (
    {
        data, 
        dataCellTable,
        selected
    }: PropsParent
) => {
    console.log(data)
    return (<Child data={data} dataCellTable={dataCellTable} selected={selected} />);
}