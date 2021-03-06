import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState(window.location.search.slice(1));
    const history = useHistory();
    useTitle("Search");

    useEffect(() => {
        // const queryString = window.location.search;
        fetch("/api/services/search?" + query)
            .then((res) => res.json())
            .then((data) => {
                setSearchResults(data);
            });
    }, [query]);

    function onSearch(queryString) {
        console.log(queryString);
        history.push("/search?" + queryString);
        setQuery(queryString);
    }

    return (
        <section className="search-container">
            <h1>Search Film Crew by title, Category or Location</h1>
            <SearchForm onSearch={onSearch} />
            <SearchResults searchResults={searchResults} />
        </section>
    );
}

export default Search;
