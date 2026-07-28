import type {
    ButtonProps,
} from "./Button.types";


const variantStyles = {

    primary:
        "bg-[#2E7D32] text-white hover:bg-[#1B5E20]",


    secondary:
        "bg-[#43A047] text-white hover:bg-[#2E7D32]",


    outline:
        "border border-[#2E7D32] text-[#2E7D32] hover:bg-[#F4F8F5]",


    danger:
        "bg-[#D32F2F] text-white hover:bg-red-800",

};



export default function Button({

    variant = "primary",

    loading = false,

    children,

    disabled,

    className = "",

    ...props

}: ButtonProps) {



    return (

        <button

            className={

                `
                px-4
                py-2
                rounded-xl
                font-medium
                transition
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${variantStyles[variant]}
                ${className}
                `

            }


            disabled={
                disabled || loading
            }


            {...props}

        >

            {

                loading

                ?

                "Procesando..."

                :

                children

            }


        </button>

    );

}