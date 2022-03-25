const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { getUserById, createService, getServices } = require("./db");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// **********************------USERS------*****************************
// ***********************************************************************
app.get("/api/users/me", async (req, res) => {
    const user = await getUserById(1);
    res.json(user);
});

// **********************------SERVICES------*****************************
// ***********************************************************************
// app.post("/api/services", async (req, res) {
//     const user = await createService(req.body).then((user) => {
//         req.session.user_id = user.id;
//         res.json(user);
//     });
//     res.statusCode = 500;
//     res.json({ error: "generic error" });
// });
app.get("/api/services/search", async (req, res) => {
    const searchResults = await getServices(req.query);
    res.json(searchResults);
});
// ***********************************************************************
// ***********************************************************************
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
