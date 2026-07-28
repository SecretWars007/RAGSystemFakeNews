import type {
    CardProps,
} from "./Card.types";


export default function Card({

    title,

    description,

    children,

    className = "",

}: CardProps) {



    return (

        <section

            className={

                `
                bg-white
                rounded-2xl
                shadow-md
                border
                border-[#D8E8D8]
                p-6
                ${className}
                `

            }

        >


            {
                title && (

                    <h2

                        className="
                        text-lg
                        font-semibold
                        text-[#1B4332]
                        mb-2
                        "

                    >

                        {title}

                    </h2>

                )
            }



            {
                description && (

                    <p

                        className="
                        text-sm
                        text-[#5E6C61]
                        mb-4
                        "

                    >

                        {description}

                    </p>

                )
            }



            <div>

                {children}

            </div>



        </section>

    );

}