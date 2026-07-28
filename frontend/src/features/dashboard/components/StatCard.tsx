import type {
    ReactNode,
} from "react";


import Card from "../../../components/common/Card";



interface StatCardProps {


    title: string;


    value: string | number;


    description?: string;


    icon: ReactNode;


}



export default function StatCard({

    title,

    value,

    description,

    icon,

}: StatCardProps) {



    return (

        <Card>


            <div

                className="
                flex
                justify-between
                items-start
                "

            >


                <div>


                    <p

                        className="
                        text-sm
                        text-[#5E6C61]
                        "

                    >

                        {title}


                    </p>




                    <h2

                        className="
                        mt-2
                        text-3xl
                        font-bold
                        text-[#1B4332]
                        "

                    >

                        {value}


                    </h2>




                    {
                        description && (

                            <p

                                className="
                                mt-2
                                text-sm
                                text-[#5E6C61]
                                "

                            >

                                {description}


                            </p>

                        )
                    }


                </div>



                <div

                    className="
                    text-3xl
                    bg-[#E8F5E9]
                    rounded-xl
                    p-3
                    "

                >

                    {icon}


                </div>



            </div>



        </Card>

    );

}