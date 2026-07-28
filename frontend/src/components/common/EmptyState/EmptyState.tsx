import type {
    EmptyStateProps,
} from "./EmptyState.types";



export default function EmptyState({

    title,

    description,

    icon = "🐶",

    action,

}: EmptyStateProps) {



    return (

        <div

            className="
            flex
            flex-col
            items-center
            justify-center
            py-12
            text-center
            "

        >


            <div

                className="
                text-5xl
                mb-4
                "

            >

                {icon}

            </div>



            <h3

                className="
                text-xl
                font-semibold
                text-[#1B4332]
                "

            >

                {title}

            </h3>



            {
                description && (

                    <p

                        className="
                        mt-2
                        text-[#5E6C61]
                        max-w-md
                        "

                    >

                        {description}

                    </p>

                )
            }



            {
                action && (

                    <div

                        className="
                        mt-6
                        "

                    >

                        {action}

                    </div>

                )
            }



        </div>

    );

}