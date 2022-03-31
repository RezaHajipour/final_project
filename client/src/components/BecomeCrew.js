import { useState } from "react";
import useTitle from "../hooks/useTitle.js";

function BecomeCrew({ user }) {
    console.log("user", user);
    const [formData, setFormData] = useState({});
    useTitle("Become Crew");

    function onSubmit(event) {
        event.preventDefault();
        fetch("/api/services", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("data is", data);
                if (data.error) {
                    setFormData({ error: data.error });
                    return;
                }
                window.location.href = "/dashboard";
            });
    }

    function onInput(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <form onSubmit={onSubmit} className="becomeCrew-form">
            <h1> Become a Crew in Crew Connector</h1>
            <h2>Reach out by thousands of Casting Managers</h2>
            <p>
                Job Title
                <input
                    type="text"
                    name="title"
                    placeholder="Write Title of your Profession"
                    className="becomeCrew-input "
                    onInput={onInput}
                />
            </p>
            <p>
                Job Category
                <input
                    type="text"
                    name="category"
                    onInput={onInput}
                    placeholder="Choose Category"
                    className="becomeCrew-input "
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
            </p>
            <p>
                Job Location
                <input
                    type="text"
                    name="location"
                    placeholder="Where are you available to work"
                    className="becomeCrew-input "
                    onInput={onInput}
                />
            </p>
            <p>
                Job Description
                <textarea
                    type="text"
                    name="description"
                    placeholder="Describe yourself and your profession"
                    className="becomeCrew-textarea"
                    onInput={onInput}
                />
            </p>
            <button className="becomeCrew-btn">Save Changes</button>
        </form>
    );
}

export default BecomeCrew;
