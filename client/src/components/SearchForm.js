import CategorySelect from "./CategorySelect";
import { useState } from "react";

function SearchForm({ onSearch }) {
    const [service, setService] = useState({});
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

    function onCategoryChange(e) {
        setService({ ...service, category: e.target.value });
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
            <CategorySelect
                onChange={onCategoryChange}
                category={service.category}
                className="edit-dashboard-input"
            />
            <button type="submit" className="search-button"></button>
        </form>
    );
}

export default SearchForm;
