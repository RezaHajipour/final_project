import { useState, useEffect } from "react";

function EditDashboard({ user }) {
    const [service, setService] = useState({});

    useEffect(() => {
        fetch("/api/services/" + user.id)
            .then((res) => res.json())
            .then((data) => setService(data));
    }, [user]);

    function onSubmit(e) {
        e.preventDefault();
        console.log("i am here");
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
                />
            </p>
            <p>
                Job Category
                <input
                    type="text"
                    name="category"
                    placeholder="Choose Category"
                    className="edit-dashboard-input"
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
            </p>
            <p>
                Job Description
                <textarea
                    type="text"
                    name="description"
                    placeholder="Describe yourself and your profession"
                    className="edit-dashboard-textarea"
                    defaultValue={service.description}
                />
            </p>
            <button className="edit-dashboard-btn">Save Changes</button>
        </form>
    );
}

export default EditDashboard;
