import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";

function formatDate(timestamp) {
    const date = new Date(timestamp);
    useTitle("Dashboard");

    return `${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}`;
}

function DashBoard({ user }) {
    const [service, setService] = useState({});

    useEffect(() => {
        // console.log("incoming id inside useEffect is:", id);
        fetch("/api/users/me/service")
            .then((res) => res.json())
            .then((data) => setService(data));
        // console.log("set user is", setUser);
    }, []);

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
            .then(() => {
                window.location.reload();
            });
    }

    return (
        <section className="dashboard-container">
            <div className="dashboard-left">
                <img
                    src={
                        user.profile_picture_url || "/images/default-avatar.png"
                    }
                    className="profile-picture"
                />

                <form onSubmit={onSubmit}>
                    <p className="profile-picture-p">
                        Change your profile Picture
                    </p>
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
                <div className="edit-dashboard">
                    <Link to="/dashboard/edit" className="edit-profile-btn">
                        {" "}
                        Edit Profile
                    </Link>
                </div>
            </div>
            <div className="dashboard-right">
                <div className="right-top">
                    <h4>
                        {user.first_name} {user.last_name}
                    </h4>
                    <p>
                        <strong className="strong">Email: </strong>
                        {user.email}
                    </p>
                    <p>
                        <strong className="strong">Joined: </strong>{" "}
                        {formatDate(user.created_at)}
                    </p>
                </div>
                <div className="right-bottom">
                    <h1 className="right-bottom-h1">CREW INFORMATION</h1>
                    <p className="right-bottom-p">
                        <strong className="strong">Job Title: </strong>
                        {service.title}
                    </p>
                    <p className="right-bottom-p">
                        <strong className="strong">Job Category: </strong>
                        {service.category}
                    </p>
                    <p className="right-bottom-p">
                        <strong className="strong">Address: </strong>
                        {service.location}
                    </p>

                    <p className="right-bottom-description">
                        <strong className="strong">Job Description: </strong>
                        {service.description}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default DashBoard;
