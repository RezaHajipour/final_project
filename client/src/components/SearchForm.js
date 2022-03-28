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
                <option value="Actor/Actress" />
                <option value="Art Director" />
                <option value="Cameraman" />
                <option value="Costume Designer" />
                <option value="Director" />
                <option value="Editor" />
                <option value="Gaffer" />
                <option value="Hair & Make Up Artist" />
                <option value="Key Grip" />
                <option value="Producer" />
                <option value="Sound Mixer" />
            </datalist>
            <button type="submit" className="search-button"></button>
        </form>
    );
}

export default SearchForm;
