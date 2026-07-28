import type {
    BadgeProps,
} from "./Badge.types";



const styles = {


    success:

        `
        bg-green-100
        text-[#2E7D32]
        `,


    warning:

        `
        bg-yellow-100
        text-yellow-700
        `,


    danger:

        `
        bg-red-100
        text-[#D32F2F]
        `,


    info:

        `
        bg-teal-100
        text-[#00897B]
        `,


    default:

        `
        bg-gray-100
        text-gray-700
        `,

};



export default function Badge({

    variant = "default",

    children,

}: BadgeProps) {



    return (

        <span

            className={

                `
                inline-flex

                items-center

                px-3

                py-1

                rounded-full

                text-xs

                font-semibold

                ${styles[variant]}

                `

            }

        >

            {children}


        </span>

    );

}