import type {
    InputProps,
} from "./Input.types";



export default function Input({

    label,

    error,

    className = "",

    ...props

}: InputProps) {



    return (

        <div

            className="
            flex
            flex-col
            gap-2
            "

        >


            {
                label && (

                    <label

                        className="
                        text-sm
                        font-medium
                        text-[#1B4332]
                        "

                    >

                        {label}

                    </label>

                )
            }



            <input


                className={

                    `
                    w-full
                    px-4
                    py-2
                    rounded-lg
                    border
                    border-[#D8E8D8]
                    bg-white
                    text-[#1B4332]
                    outline-none
                    transition

                    focus:border-[#2E7D32]

                    focus:ring-2

                    focus:ring-[#8BC34A]

                    ${className}

                    `

                }


                {...props}


            />



            {
                error && (

                    <span

                        className="
                        text-sm
                        text-[#D32F2F]
                        "

                    >

                        {error}

                    </span>

                )
            }



        </div>

    );

}