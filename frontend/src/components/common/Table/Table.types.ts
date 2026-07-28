import type {
    ReactNode,
} from "react";


export interface TableColumn<T> {


    key: keyof T;


    header: string;


    render?: (
        value: T[keyof T],
        row: T,
    ) => ReactNode;

}



export interface TableProps<T> {


    columns: TableColumn<T>[];


    data: T[];


    emptyMessage?: string;

}