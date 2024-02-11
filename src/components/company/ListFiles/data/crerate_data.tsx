import {Data} from "../../../../data/interface/DataTableFiles"

export function createData(
        id: number,
        name: string,
        author: string,
        time_stamp: string
): Data {
    return {
        id,
        name,
        author,
        time_stamp
    };
}