import { useState, useEffect } from "react";
import CategorySelect from "./CategorySelect";
import useTitle from "../hooks/useTitle.js";

function EditDashboard({ user }) {
    const [service, setService] = useState({});
    useTitle("Edit Dashboard");

    useEffect(() => {
        fetch("/api/users/me/service")
            .then((res) => res.json())
            .then((data) => setService(data));
    }, [user]);

    function onSubmit(e) {
        e.preventDefault();
        console.log("i am here", service);
        fetch("/api/users/me/service", {
            method: "PUT",
            body: JSON.stringify(service),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then(() => {
                window.location.href = "/dashboard";
            });
    }

    function onCategoryChange(e) {
        setService({ ...service, category: e.target.value });
    }

    function onInput(e) {
        setService({ ...service, [e.target.name]: e.target.value });
    }
    return (
        <form className="edit-dashboard-form" onSubmit={onSubmit}>
            <h1>Edit Profile</h1>
            <p>
                First Name
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    className="edit-dashboard-input"
                    defaultValue={user.first_name}
                    onInput={onInput}
                    required
                />
            </p>
            <p>
                Last Name
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    className="edit-dashboard-input"
                    defaultValue={user.last_name}
                    onInput={onInput}
                    required
                />
            </p>
            <p>
                Email
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="edit-dashboard-input"
                    defaultValue={user.email}
                    onInput={onInput}
                    required
                />
            </p>

            <p>
                Job Title
                <input
                    type="text"
                    name="title"
                    placeholder="Write Title of your Profession"
                    className="edit-dashboard-input"
                    defaultValue={service.title}
                    onInput={onInput}
                    required
                />
            </p>
            <p>
                Job Category
                <CategorySelect
                    onChange={onCategoryChange}
                    category={service.category}
                    className="edit-dashboard-input"
                />
            </p>
            <p>
                Job Description
                <textarea
                    type="text"
                    name="description"
                    placeholder="Describe yourself and your profession"
                    className="edit-dashboard-textarea"
                    defaultValue={service.description}
                    onInput={onInput}
                    required
                />
            </p>
            <button className="edit-dashboard-btn">Save Changes</button>
        </form>
    );
}

export default EditDashboard;
