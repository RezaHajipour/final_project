import { useState } from "react";

function BecomeCrew({ user }) {
    console.log("user", user);
    const [formData, setFormData] = useState({});

    function onSubmit(event) {
        event.preventDefault();
        fetch("/api/services/" + user.id, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data is", data);
                if (data.error) {
                    setFormData({ error: data.error });
                    return;
                }
                window.location.href = "/";
            });
    }

    function onInput(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    console.log(formData);
    //  <h4>
    //      Become a Crew in Crew Connector to be reach by thousands of Casting Manager
    //  </h4>;
    return (
        <div className="becomeCrew-container">
            <form onSubmit={onSubmit} className="becomeCrew-form">
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
        </div>
    );
}

export default BecomeCrew;
