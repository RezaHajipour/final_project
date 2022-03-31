import { Link } from "react-router-dom";

function SearchResults({ searchResults }) {
    console.log(searchResults);
    return (
        <ul className="searchResult-ul">
            {searchResults.map((user) => (
                <li key={user.id}>
                    <Link
                        to={`/services/${user.id}`}
                        className="searchResult-link"
                    >
                        <div className="card">
                            <img
                                src={
                                    user.profile_picture_url ||
                                    "/images/default-avatar.png"
                                }
                                alt="img"
                            />
                            <h3>
                                {user.first_name} {user.last_name}
                            </h3>
                            <div className="card-content">
                                <p>{user.title}</p>
                                <p>{user.category}</p>
                                <p> {user.location}</p>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default SearchResults;
