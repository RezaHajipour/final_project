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

// ***********************************************************************
// **********************------USERS------*********************************
// ***********************************************************************
function getUserById(id) {
    return db
        .query("SELECT * FROM users WHERE id= $1", [id])
        .then((result) => result.rows[0]);
}

// ***********************************************************************
// **********************------SERVICES------*****************************
// ***********************************************************************
function createService({
    title,
    category,
    location,
    description,
    service_picture_url,
}) {
    return db
        .query(
            `INSERT INTO services ( title, category, location, description, service_picture_url)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *`,
            [title, category, location, description, service_picture_url]
        )
        .then((result) => result.rows[0]);
}

function getServices({ title, category, location }) {
    console.log({ title, category, location });
    return db
        .query(
            `SELECT services.*, users.id AS user_id,
            users.first_name, users.last_name 
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
module.exports = {
    getUserById,
    createService,
    getServices,
};
