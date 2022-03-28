const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { getUserById, getServices, createUser, login } = require("./db");
const cookieSession = require("cookie-session");

app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

//middlewares
app.use(express.json());
app.use(cookieSessionMiddleware);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// **********************------USERS------*****************************
// ***********************************************************************
app.get("/api/users/me", async function (req, res) {
    const user = await getUserById(req.session.user_id);
    if (!user) {
        res.json(null);
        return;
    }
    res.json(user);
});

// **********************------SERVICES------*****************************
// ***********************************************************************

app.get("/api/services/search", async (req, res) => {
    const searchResults = await getServices(req.query);
    res.json(searchResults);
});

// **********************------REGISTER------*****************************
// ***********************************************************************
app.post("/api/users", function (req, res) {
    // console.log(req.body);
    createUser(req.body)
        .then((user) => {
            req.session.user_id = user.id;
            // console.log("session", req.session.user_id);
            res.json(user);
        })
        .catch((error) => {
            console.log("post register users", error);
            if (error.constraint == "users_email_key") {
                res.statusCode = 400;
                res.json({ error: "email duplicated" });
                return;
            }
            res.statusCode = 500;
            res.json({ error: "generic error" });
        });
});

// **********************------LOGIN------********************************
// ***********************************************************************

app.post("/api/login", function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.statusCode = 401;
        res.render("login", {
            title: "Login",
            error: "please write your email and password",
        });
        return;
    }
    login(req.body)
        .then((user) => {
            req.session.user_id = user.id;
            res.json(user);
        })
        .catch((error) => {
            console.log("login post:", error);
            if (error.constraint == "users_email_key") {
                res.statusCode = 400;
                res.json({ error: "wrong credentials" });
                return;
            }
            res.statusCode = 500;
            res.json({ error: "wrong credentials" });
        });
});

// **********************------logout------******************************
// ***********************************************************************
app.post("/api/logout", function (req, res) {
    req.session = null;
    res.json({ success: true });
});
// ***********************************************************************
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
