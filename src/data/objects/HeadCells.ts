import { HeadCell } from "../interface/DataHeadCell";

export const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Имя файла',
    },
    {
        id: 'author',
        numeric: true,
        disablePadding: false,
        label: 'Автор',
    },
    {
        id: 'time_stamp',
        numeric: true,
        disablePadding: false,
        label: 'Время',
    }
];