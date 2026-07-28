import type {
    TextAreaProps,
} from "./TextArea.types";


export default function TextArea({

    label,

    error,

    className = "",

    ...props

}: TextAreaProps) {



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



            <textarea


                className={

                    `
                    w-full

                    min-h-[120px]

                    px-4

                    py-3

                    rounded-lg

                    border

                    border-[#D8E8D8]

                    bg-white

                    text-[#1B4332]

                    resize-y

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