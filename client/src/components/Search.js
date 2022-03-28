import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState(window.location.search.slice(1));
    const history = useHistory();

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
        <section>
            <SearchForm onSearch={onSearch} />
            <SearchResults searchResults={searchResults} />
        </section>
    );
}

export default Search;
