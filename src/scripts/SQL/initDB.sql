DROP TABLE IF EXISTS locality;

CREATE TABLE locality(
    codePostal integer PRIMARY KEY UNIQUE NOT NULL,
    city varchar NOT NULL,
    country varchar NOT NULL
);

DROP TABLE IF EXISTS location;

CREATE TABLE location(
    id integer PRIMARY KEY AUTOINCREMENT,
    name varchar UNIQUE NOT NULL,
    street varchar NOT NULL,
    number integer NOT NULL,
    additionalAddress varchar,
    locality integer NOT NULL,
    FOREIGN KEY(locality) REFERENCES locality(codePostal)
);

DROP TABLE IF EXISTS concert;

CREATE TABLE concert(
    id integer PRIMARY KEY AUTOINCREMENT,
    title varchar NOT NULL,
    content text NOT NULL,
    dateRedaction date DEFAULT current_timestamp,
    cover varchar,
    dateEvent datetime NOT NULL,
    isCanceled integer DEFAULT FALSE,
    location integer NOT NULL,
    FOREIGN KEY(location) REFERENCES location(id)
);

DROP TABLE IF EXISTS news;

CREATE TABLE news(
    id integer PRIMARY KEY AUTOINCREMENT,
    title varchar NOT NULL,
    content text NOT NULL,
    dateRedaction date DEFAULT current_timestamp,
    cover varchar
);

DROP TABLE IF EXISTS eventNews;

CREATE TABLE eventNews(
    id integer PRIMARY KEY,
    location integer NOT NULL,
    dateEvent datetime NOT NULL,
    isCanceled integer DEFAULT FALSE,
    FOREIGN KEY(id) REFERENCES news(id),
    FOREIGN KEY(location) REFERENCES location(name)
);

DROP TABLE IF EXISTS user;

CREATE TABLE user(
    id integer PRIMARY KEY AUTOINCREMENT,
    username varchar NOT NULL,
    email varchar UNIQUE NOT NULL,
    password varchar NOT NULL,
    level integer NOT NULL
);