const spicedPg = require("spiced-pg");
const bcrypt = require("bcryptjs");
const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,
} = require("../secrets.json");

console.log(`[db] Connecting to: ${DATABASE_NAME}`);
const db = spicedPg(
    `postgres:${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}`
);

const hash = (password) => {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
};
// ***********************************************************************
// **********************------USERS------*********************************
// ***********************************************************************
function getUserById(id) {
    return db
        .query("SELECT * FROM users WHERE id= $1", [id])
        .then((result) => result.rows[0]);
}

function getServiceByUserId(user_id) {
    return db
        .query("SELECT * FROM services WHERE user_id= $1", [user_id])
        .then((result) => result.rows[0]);
}
// ***********************************************************************
// **********************------SERVICES------*****************************
// ***********************************************************************
function createService({
    user_id,
    title,
    category,
    location,
    description,
    service_picture_url,
}) {
    return db
        .query(
            `INSERT INTO services ( user_id, title, category, location, description, service_picture_url)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *`,
            [
                user_id,
                title,
                category,
                location,
                description,
                service_picture_url,
            ]
        )
        .then((result) => result.rows[0]);
}

function getServices({ title, category, location }) {
    console.log({ title, category, location });
    return db
        .query(
            `SELECT services.*, users.id AS user_id,
            users.first_name, users.last_name,  profile_picture_url
            FROM services 
            JOIN users
            ON  users.id = services.user_id  
            WHERE services.title ILIKE $1
            AND ($2::text is null or services.category ILIKE $2)
            AND ($3::text is null or services.location ILIKE $3)
            `,
            [
                title + "%",
                category ? category + "%" : null,
                location ? location + "%" : null,
            ]
        )
        .then(({ rows }) => rows);
}

function updateServiceByUserId({
    user_id,
    title,
    category,
    location,
    description,
}) {
    console.log(title, category, location, description, user_id);
    return db
        .query(
            `UPDATE services SET title = $1 , category= $2 , location = $3, description = $4 
        WHERE user_id = $5
        RETURNING *`,
            [title, category, location, description, user_id]
        )
        .then((result) => result.rows[0]);
}
// ***********************************************************************
// **********************------REGISTER------*****************************
// ***********************************************************************

function createUser({
    first_name,
    last_name,
    email,
    password,
    profile_picture_url,
}) {
    console.log(first_name, last_name, email, password);
    return hash(password).then((password_hash) => {
        return db
            .query(
                `INSERT INTO users (first_name, last_name, email, password_hash, profile_picture_url)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *`,
                [
                    first_name,
                    last_name,
                    email,
                    password_hash,
                    profile_picture_url,
                ]
            )
            .then((result) => result.rows[0]);
    });
}

// ***********************************************************************
// **********************------LOGIN------********************************
// ***********************************************************************

function login({ email, password }) {
    return getUserByEmail(email).then((foundUser) => {
        if (!foundUser) {
            return null;
        }
        return bcrypt
            .compare(password, foundUser.password_hash)
            .then((match) => {
                if (match) {
                    return foundUser;
                }
                return null;
            });
    });
}
// --------------------------GET USERS BY EMAIL-----------------------------

function getUserByEmail(email) {
    return db
        .query("SELECT * FROM users WHERE email= $1", [email])
        .then((result) => result.rows[0]);
}

// --------------------------GET service by id-----------------------------
function getServiceById(id) {
    return db
        .query(
            `SELECT services.*, users.id AS user_id, users.profile_picture_url,
            users.first_name, users.last_name 
            FROM services 
            JOIN users
            ON  users.id = services.user_id  
            WHERE services.id = $1
            `,
            [id]
        )
        .then(({ rows }) => rows[0]);
}

// --------------------------UPDATE PROFILE PICTURE-----------------------

function updateProfilePicture({ profile_picture_url, user_id }) {
    return db
        .query("UPDATE users SET profile_picture_url= $1 WHERE id=$2", [
            profile_picture_url,
            user_id,
        ])
        .then((result) => result.rows[0]);
}

// INSERT INTO services (user_id,title, category, description, location) VALUES ();

module.exports = {
    getUserById,
    createService,
    getServices,
    createUser,
    login,
    getServiceById,
    updateProfilePicture,
    getServiceByUserId,
    updateServiceByUserId,
};
