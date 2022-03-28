import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({});

    function onSubmit(event) {
        event.preventDefault();
        fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
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

    return (
        <div className="register-container">
            <form onSubmit={onSubmit} className="register-form">
                <h2 className="register-form-h2">Sign Up</h2>
                <ul className="register-form-ul">
                    <li>
                        <input
                            className="register-input"
                            type="text"
                            name="first_name"
                            required
                            placeholder="First Name"
                            onInput={onInput}
                        />
                    </li>
                    <li>
                        <input
                            className="register-input"
                            type="text"
                            name="last_name"
                            required
                            placeholder="Last Name"
                            onInput={onInput}
                        />
                    </li>
                    <li>
                        <input
                            className="register-input"
                            type="email"
                            name="email"
                            required
                            placeholder="Email"
                            onInput={onInput}
                        />
                    </li>
                    <li>
                        <input
                            className="register-input"
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            onInput={onInput}
                        />
                    </li>
                    <li>
                        <button type="submit" className="register-Btn">
                            REGISTER
                        </button>
                    </li>
                    <p className="register-p">
                        Already Registered?&nbsp;
                        <Link to="/login" className="login-here">
                            LOGIN HERE.
                        </Link>
                    </p>
                </ul>
            </form>
        </div>
    );
}

export default Register;
