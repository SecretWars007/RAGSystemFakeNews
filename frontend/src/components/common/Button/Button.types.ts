export type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "danger";


export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    variant?: ButtonVariant;

    loading?: boolean;

    children: React.ReactNode;
}