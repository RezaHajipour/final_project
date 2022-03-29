import { useState, useEffect } from "react";

function DashBoard({ user }) {
    const [service, setService] = useState({});

    useEffect(() => {
        // console.log("incoming id inside useEffect is:", id);
        fetch("/api/services/" + user.id)
            .then((res) => res.json())
            .then((data) => setService(data));
        // console.log("set user is", setUser);
    }, [user]);

    function onSubmit(e) {
        e.preventDefault();
        const file = e.target.avatar.files[0];
        const body = new FormData();

        body.append("profile_picture", file);

        fetch("/api/users/me/picture", {
            method: "POST",
            body,
        })
            .then((response) => response.json())
            .then((data) => {
                window.location.reload();
            });
    }

    return (
        <section className="dashboard-container">
            <div>
                <h1>Dashboard</h1>
                <p>
                    Welcome{" "}
                    <strong>
                        {" "}
                        {user.first_name} {user.last_name}
                    </strong>
                </p>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-left">
                    <img
                        src={user.profile_picture_url}
                        className="profile-picture"
                    />
                    <p>Change your profile Picture</p>
                    <form onSubmit={onSubmit}>
                        <input
                            type="file"
                            accept="image/*"
                            name="avatar"
                            id="image"
                            placeholder="User Profile Picture"
                            required
                        />
                        <button type="submit" className="profile-img-Btn">
                            UPLOAD
                        </button>
                    </form>
                </div>
                <div className="dashboard-right">
                    <p>category:{service.category}</p>
                    <p>title:{service.title}</p>
                    <p>{service.description}</p>
                    <p>{service.location}</p>
                </div>
            </div>
        </section>
    );
}

export default DashBoard;
