import StatCard from "../components/StatCard";

import QuickActions from "../components/QuickActions";


export default function Dashboard(){


    return (

        <main>


            <h1>
                Dashboard
            </h1>



            <section>


                <StatCard

                    title="Sistema"

                    value="FakeNewsRAGSystem"

                />


                <StatCard

                    title="Motor IA"

                    value="Gemini + LangGraph"

                />


                <StatCard

                    title="Vector DB"

                    value="PostgreSQL pgvector"

                />


            </section>



            <QuickActions/>


        </main>

    );

}