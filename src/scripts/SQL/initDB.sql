DROP TABLE IF EXISTS concert;

CREATE TABLE concert(
    id integer PRIMARY KEY AUTOINCREMENT,
    title varchar UNIQUE NOT NULL,
    content varchar NOT NULL,
    dateRedaction date DEFAULT current_timestamp,
    cover varchar,
    dateEvent datetime NOT NULL,
    isCanceled integer DEFAULT FALSE
    -- location
);