INSERT INTO locality(codePostal, city, country)
VALUES
    ( 6700, "Arlon", "Belgique");
    -- ( , "", ""),

INSERT INTO location(name, street, number, additionalAddress, locality)
VALUES
    ("Salle de l'harmonie la Stockemoise", "rue de l'Harmonie", 36, 'Stockem', 6700);
    -- ("", "", , "", ),

INSERT INTO location(name, street, number, locality)
VALUES
    ("Eglise du Sacré-Cœur Arlon", "rue des Déportés", 99999999, 6700),
    ("Chapelle St-Bernard à Arlon", "rue des Buissons", 3, 6700);
    -- ("", "", , ),

INSERT INTO concert(cover, title, content, dateEvent, location, author)
VALUES
    ("concert-noel-2025.jpg", 'Concert de Noël', 'TODO','2025-12-06 20:00:00', 2, 1);

INSERT INTO concert(title, content, dateEvent, location, author)
VALUES
    ('Concert FMLB', 'concert de cloture des cours de direction', '2025-10-12 15:00:00', 1, 1),
    ('Concert avec le Big Band de Differdange', 'TODO', '2026-05-09 20:00:00', 2, 1),
    ('Sainte Cécile', 'TODO','2025-11-22 16:00:00', 3, 1);