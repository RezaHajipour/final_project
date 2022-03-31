function SearchForm({ onSearch }) {
    function onSubmit(e) {
        e.preventDefault();
        const query = {
            title: e.target.title.value,
            location: e.target.location.value,
            category: e.target.category.value,
        };
        const queryString = new URLSearchParams(query).toString();
        // console.log(queryString);
        onSearch(queryString);
    }
    return (
        <form onSubmit={onSubmit} className="search-form">
            <input
                type="search"
                name="title"
                placeholder="What are you looking for?"
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
                <option value="Actor/Actress" />
                <option value="Director" />
                <option value="Production" />
                <option value="Camera and Lighting" />
                <option value="Costume department" />
                <option value="Sound Production" />
                <option value="Hair & Make Up" />
                <option value="Special effects" />
                <option value="Post-production" />
                <option value="Sound and music" />
            </datalist>
            <button type="submit" className="search-button"></button>
        </form>
    );
}

export default SearchForm;
