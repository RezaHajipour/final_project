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
                <option name="category" value="Actor/Actress" />
                <option name="category" value="Art Director" />
                <option name="category" value="Cameraman" />
                <option name="category" value="Costume Designer" />
                <option name="category" value="Director" />
                <option name="category" value="Editor" />
                <option name="category" value="Gaffer" />
                <option name="category" value="Hair & Make Up Artist" />
                <option name="category" value="Key Grip" />
                <option name="category" value="Producer" />
                <option name="category" value="Sound Mixer" />
            </datalist>
            <button type="submit" className="search-button"></button>
        </form>
    );
}

export default SearchForm;
