DROP TABLE IF EXISTS member CASCADE;

CREATE TABLE member(
    id int PRIMARY KEY generated always as identity,
    username varchar(64) NOT NULL,
    email varchar(64) UNIQUE NOT NULL,
    password varchar(192) NOT NULL,
    level int NOT NULL
);

DROP TABLE IF EXISTS country CASCADE;

CREATE TABLE country(
    id int PRIMARY KEY generated always as identity,
    name varchar(64) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS locality CASCADE;

CREATE TABLE locality(
    codePostal int PRIMARY KEY UNIQUE NOT NULL,
    city varchar(64) NOT NULL,
    country int NOT NULL,
    FOREIGN KEY(country) REFERENCES country(id)
);

DROP TABLE IF EXISTS location CASCADE;

CREATE TABLE location(
    id int PRIMARY KEY generated always as identity,
    name varchar(64) UNIQUE NOT NULL,
    street varchar(64) NOT NULL,
    number int NOT NULL,
    additionalAddress varchar(64),
    locality int NOT NULL,
    FOREIGN KEY(locality) REFERENCES locality(codePostal)
);

DROP TABLE IF EXISTS concert CASCADE;

CREATE TABLE concert(
    id int PRIMARY KEY generated always as identity,
    title varchar(64) NOT NULL,
    content text NOT NULL,
    dateRedaction timestamp DEFAULT current_timestamp,
    cover varchar(64),
    author int NOT NULL,
    dateEvent timestamp NOT NULL,
    isCanceled boolean DEFAULT FALSE,
    location int NOT NULL,
    FOREIGN KEY(author) REFERENCES member(id),
    FOREIGN KEY(location) REFERENCES location(id)
);

DROP TABLE IF EXISTS news CASCADE;

CREATE TABLE news(
    id int PRIMARY KEY generated always as identity,
    title varchar(64) NOT NULL,
    content text NOT NULL,
    dateRedaction timestamp DEFAULT current_timestamp,
    cover varchar(64),
    author int NOT NULL,
    FOREIGN KEY(author) REFERENCES member(id)
);

DROP TABLE IF EXISTS eventNews CASCADE;

CREATE TABLE eventNews(
    id int PRIMARY KEY,
    location int NOT NULL,
    dateEvent timestamp NOT NULL,
    isCanceled boolean DEFAULT FALSE,
    FOREIGN KEY(id) REFERENCES news(id),
    FOREIGN KEY(location) REFERENCES location(id)
);