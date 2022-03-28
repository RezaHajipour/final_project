// import React from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Search from "./Search";
import BecomeCrew from "./BecomeCrew";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";

function App() {
    return (
        <BrowserRouter>
            <header className="header-container">
                <nav className="nav-container">
                    <NavLink exact to="/" className="nav-link">
                        <h1 className="logo">CREW CONNECTOR</h1>
                    </NavLink>
                    <NavLink exact to="/search" className="nav-link">
                        SEARCH CREW
                    </NavLink>
                    <NavLink exact to="/searchByMap" className="nav-link">
                        SEARCH BY LOCATION
                    </NavLink>
                    <NavLink exact to="/crew" className="nav-link">
                        BECOME A CREW
                    </NavLink>
                    <NavLink exact to="/about" className="nav-link">
                        ABOUT
                    </NavLink>
                    <Logout />
                </nav>
            </header>
            <section className="app-container">
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/crew">
                    <BecomeCrew />
                </Route>
                <Route path="/search">
                    <Search />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
            </section>

            <Footer />
        </BrowserRouter>
    );
}

export default App;

//  <img src="./images/logo3.png" alt="logo" className="logo" />;
