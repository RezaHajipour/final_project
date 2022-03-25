// import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import Footer from "./Footer";
import Search from "./Search";

function App() {
    return (
        <BrowserRouter>
            <header className="header-container">
                <nav>
                    <NavLink exact to="/">
                        Home
                    </NavLink>
                    <NavLink exact to="/search">
                        search
                    </NavLink>
                    <NavLink exact to="/service">
                        Offer Service
                    </NavLink>
                </nav>
            </header>
            <section className="app-container">
                <h1>app component</h1>
                <Search />
            </section>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
