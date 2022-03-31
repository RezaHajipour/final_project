
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id                  SERIAL PRIMARY KEY,
    first_name          VARCHAR(255) NOT NULL,
    last_name           VARCHAR(255) NOT NULL,
    email               VARCHAR(50) NOT NULL UNIQUE,
    password_hash       VARCHAR NOT NULL,
    profile_picture_url VARCHAR,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    id             SERIAL PRIMARY KEY,
    user_id       INT REFERENCES users(id) NOT NULL,
    title         VARCHAR(255) NOT NULL,
    category           VARCHAR(255) NOT NULL,
    location       VARCHAR(255) NOT NULL,
    description text,
    service_picture_url VARCHAR,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- INSERT INTO users (first_name, last_name, email, password_hash) VALUES ('reza', 'haji', 'reza@mail.com', '$');
-- INSERT INTO users (first_name, last_name, email, password_hash) VALUES ('nila', 'hajipour', 'nila@mail.com', '$');
-- INSERT INTO services (user_id,title, category, location) VALUES (1, 'service1', 'transport', 'Hamburg, Germany');
-- INSERT INTO services (user_id,title, category, location) VALUES (2, 'service2', 'education', 'Hamburg, Germany');
-- INSERT INTO services (user_id,title, category, location) VALUES (2, 'service3', 'sport', 'Hamburg, Germany');
-- INSERT INTO services (user_id,title, category, location) VALUES (1, 'service4', 'transport', 'Berlin, Germany');

-- INSERT INTO services (user_id,title, category, description, location) VALUES (1, 'cameraman', 'photography', 'I am working as a DOP for more than 10 years', 'Berlin, Germany');
-- INSERT INTO services (user_id,title, category, description, location) VALUES (2, 'director', 'directing', 'I direct documentaries and short films', 'Lisbon, Portugal');
-- INSERT INTO services (user_id,title, category, description, location) VALUES (3, 'actor', 'acting', 'I aman actress for more than 5 years', 'Tokyo, Japan');
-- INSERT INTO services (user_id,title, category, description, location) VALUES (4, 'actress', 'acting', 'best role i ever played was quenn elisabeth role ', 'Hamburg, Germany');
-- INSERT INTO services (user_id,title, category, description, location) VALUES (5, 'make up', 'make up artist', 'I do make up and hair style', 'Berlin, Germany');
-- INSERT INTO services (user_id,title, category, description, location) VALUES (6, 'Soundman', 'Sound', 'I am working as a soundman for more than 20 years', 'Rome, Italy');
-- INSERT INTO services (user_id,title, category, description, location) VALUES (7, 'Film and TV director', 'director', 'I have worked both in TV and Cinema and made more than 40 movies and differents Tv programs.', 'Hamburg, Germany');