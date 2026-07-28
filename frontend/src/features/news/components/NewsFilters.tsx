import {
    Link,
} from "react-router-dom";


import SearchBox from "../../../components/common/SearchBox";


import Button from "../../../components/common/Button";



interface NewsFiltersProps {


    search: string;


    setSearch: (
        value:string
    ) => void;


}



export default function NewsFilters({

    search,

    setSearch,

}: NewsFiltersProps){



    return (

        <div

            className="
            flex
            flex-col
            md:flex-row
            gap-4
            justify-between
            items-center
            "

        >


            <div

                className="
                flex-1
                "

            >

                <SearchBox

                    placeholder="
                    Buscar noticias...
                    "

                    value={search}

                    onChange={
                        e =>
                        setSearch(
                            e.target.value
                        )
                    }

                />

            </div>




            <Link

                to="/news/create"

            >

                <Button>

                    + Crear noticia

                </Button>


            </Link>



        </div>

    );

}