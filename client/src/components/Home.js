import SearchForm from "./SearchForm";
import { useHistory } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";

function Home() {
    const history = useHistory();
    useTitle("Home");

    function onSearch(queryString) {
        console.log(queryString);
        history.push("/search?" + queryString);
    }
    return (
        <section className="home-container">
            <h1 className="title1">
                The Easiest Way to Find Your Film Crews. Try It NOW!
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
