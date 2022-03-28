import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({});

    function onSubmit(event) {
        event.preventDefault();
        fetch("/api/login", {
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
    return (
        <div className="login-container">
            <form onSubmit={onSubmit} className="login-form">
                <h2 className="login-form-h2">Login</h2>
                <ul className="login-form-ul">
                    <li>
                        <input
                            className="login-input"
                            type="email"
                            name="email"
                            required
                            placeholder="Email"
                            onInput={onInput}
                        />
                    </li>
                    <li>
                        <input
                            className="login-input"
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            onInput={onInput}
                        />
                    </li>
                    <li>
                        <button type="submit" className="login-Btn">
                            LOGIN
                        </button>
                    </li>
                    <p className="login-p">Don't have an account yet?</p>
                    <p className="login-p2">
                        <Link to="/register" className="register-here">
                            REGISTER HERE
                        </Link>
                    </p>
                </ul>
            </form>
        </div>
    );
}

export default Login;
