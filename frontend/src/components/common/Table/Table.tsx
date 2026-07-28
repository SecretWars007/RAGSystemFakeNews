import type {
    TableProps,
} from "./Table.types";



export default function Table<T>({

    columns,

    data,

    emptyMessage = "No existen registros",

}: TableProps<T>) {



    return (

        <div

            className="
            overflow-x-auto
            rounded-xl
            border
            border-[#D8E8D8]
            "

        >


            <table

                className="
                min-w-full
                bg-white
                "

            >



                <thead>


                    <tr

                        className="
                        bg-[#F4F8F5]
                        "

                    >


                        {
                            columns.map(

                                column => (

                                    <th

                                        key={
                                            String(column.key)
                                        }

                                        className="
                                        px-5
                                        py-3
                                        text-left
                                        text-sm
                                        font-semibold
                                        text-[#1B4332]
                                        "

                                    >

                                        {
                                            column.header
                                        }


                                    </th>

                                )

                            )
                        }



                    </tr>


                </thead>




                <tbody>


                    {

                        data.length === 0

                        ?

                        (

                            <tr>

                                <td

                                    colSpan={
                                        columns.length
                                    }

                                    className="
                                    text-center
                                    py-8
                                    text-[#5E6C61]
                                    "

                                >

                                    {
                                        emptyMessage
                                    }


                                </td>


                            </tr>

                        )


                        :


                        data.map(

                            (row,index)=>(


                                <tr

                                    key={index}

                                    className="
                                    border-t
                                    border-[#D8E8D8]
                                    hover:bg-[#F4F8F5]
                                    "

                                >


                                    {
                                        columns.map(

                                            column => (

                                                <td

                                                    key={
                                                        String(column.key)
                                                    }

                                                    className="
                                                    px-5
                                                    py-3
                                                    text-sm
                                                    text-[#5E6C61]
                                                    "

                                                >

                                                    {

                                                        column.render

                                                        ?

                                                        column.render(

                                                            row[column.key],

                                                            row

                                                        )

                                                        :

                                                        String(
                                                            row[column.key]
                                                        )

                                                    }


                                                </td>

                                            )

                                        )
                                    }



                                </tr>


                            )

                        )

                    }



                </tbody>



            </table>



        </div>

    );

}