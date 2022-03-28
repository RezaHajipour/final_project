import SearchForm from "./SearchForm";
import { useHistory } from "react-router-dom";

function Home() {
    const history = useHistory();

    function onSearch(queryString) {
        console.log(queryString);
        history.push("/search?" + queryString);
    }
    return (
        <section>
            <h1 className="title1">
                The Easiest Way to Find Your Crew. Try It NOW!
            </h1>
            <SearchForm onSearch={onSearch} />

            <img
                src="./images/background.png"
                alt="background"
                className="background-img"
            />
        </section>
    );
}

export default Home;
