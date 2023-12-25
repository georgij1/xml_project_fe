import { Data } from "../interface/DataTableFiles";

export const createData = (
    id: number,
    name: string,
    author: string,
    time_stamp: string
): Data => {
    return {
        id,
        name,
        author,
        time_stamp
    };
}