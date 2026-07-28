import {
    Search,
} from "lucide-react";


import type {
    SearchBoxProps,
} from "./SearchBox.types";



export default function SearchBox({

    placeholder = "Buscar...",

    className = "",

    ...props

}: SearchBoxProps) {



    return (

        <div

            className="
            relative
            w-full
            "

        >


            <Search

                size={20}

                className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-[#5E6C61]
                "

            />



            <input


                className={

                    `
                    w-full

                    pl-10

                    pr-4

                    py-2

                    rounded-lg

                    border

                    border-[#D8E8D8]

                    bg-white

                    text-[#1B4332]


                    outline-none


                    focus:border-[#2E7D32]


                    focus:ring-2


                    focus:ring-[#8BC34A]


                    ${className}

                    `

                }


                placeholder={placeholder}


                {...props}


            />



        </div>

    );

}