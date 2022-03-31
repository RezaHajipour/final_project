const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const {
    getUserById,
    getServices,
    createUser,
    login,
    getServiceById,
    updateProfilePicture,
    createService,
    getServiceByUserId,
    updateServiceByUserId,
} = require("./db");
const cookieSession = require("cookie-session");
const uploader = require("./uploader");
const { Bucket, s3upload } = require("./s3");

app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

//middlewares
app.use(express.json());
app.use(cookieSessionMiddleware);
app.use(express.urlencoded({ extended: false }));

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

app.get("/api/users/me/service", async function (req, res) {
    const service = await getServiceByUserId(req.session.user_id);
    if (!service) {
        res.json(null);
        return;
    }
    res.json(service);
});

app.put("/api/users/me/service", async function (req, res) {
    const service = await updateServiceByUserId({
        user_id: req.session.user_id,
        ...req.body,
    });
    if (!service) {
        res.json(null);
        return;
    }
    res.json(service);
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

// **********************------user profile(service)------******************************
// ***********************************************************************
app.get("/api/services/:id", async function (req, res) {
    const id = req.params.id;
    const service = await getServiceById(id);
    res.json(service);
});

// **********************-----------PROFILE PICTURE---------**************
// ***********************************************************************
app.post(
    "/api/users/me/picture",
    uploader.single("profile_picture"),
    s3upload,
    async (req, res) => {
        const profile_picture_url = `https://s3.amazonaws.com/${Bucket}/${req.file.filename}`;
        // console.log(req.session.user_id);
        await updateProfilePicture({
            profile_picture_url,
            user_id: req.session.user_id,
        });
        res.json({ profile_picture_url });
    }
);

// **********************------Become a crew------*****************************
// ***********************************************************************
app.post("/api/services", async function (req, res) {
    // console.log(req.body);
    console.log("req session user id", req.session.user_id);

    const Becomecrew = await createService({
        user_id: req.session.user_id,
        ...req.body,
    });
    res.json({ Becomecrew });
});

// ***********************************************************************
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
