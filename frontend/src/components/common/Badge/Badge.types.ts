import type {
    ReactNode,
} from "react";


export type BadgeVariant =

    | "success"

    | "warning"

    | "danger"

    | "info"

    | "default";



export interface BadgeProps {

    variant?: BadgeVariant;


    children: ReactNode;

}