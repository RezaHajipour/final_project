function Search() {
    function onSubmit(e) {
        e.preventDefault();
        const query = {
            title: e.target.title.value,
            location: e.target.location.value,
            category: e.target.category.value,
        };
        const queryString = new URLSearchParams(query).toString();
        console.log(queryString);
        fetch("/api/services/search?" + queryString);
    }
    return (
        <form onSubmit={onSubmit}>
            <input
                type="search"
                name="title"
                placeholder="What are you looking?"
                required
                className="search-input"
            />

            <input
                type="text"
                name="location"
                placeholder="Location"
                className="search-input"
            />
            <input
                type="text"
                name="category"
                placeholder="Choose category"
                className="search-input"
                list="list-id"
            ></input>
            <datalist id="list-id">
                <option label="education" value="education" />
                <option label="sport" value="sport" />
                <option label="food" value="food" />
                <option label="transport" value="transport" />
            </datalist>

            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    );
}

export default Search;
