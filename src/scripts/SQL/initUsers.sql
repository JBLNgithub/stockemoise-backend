INSERT INTO user(username, email, password, level)
VALUES
    ('jb', 'admin@stockemoise.be', '$argon2id$v=19$m=65536,t=3,p=4$5iaOjluUX4KZGQAaJ7velQ$aGnXdASV3hJEv5Wr5xYhQz3E0QtokLntFIf2k7ARbkQ', 0),
    -- ('moderator', 'mod@stockemoise.be', '$argon2id$v=19$m=65536,t=3,p=4$HtC/IeWKSrmKAGJL0VbYug$xis4pWogjhBhOz3A4xqHeH3DyTNHQ5pzHn4fTtbsrXk', 1),
    -- ('operator', 'op@stockemoise.be', '$argon2id$v=19$m=65536,t=3,p=4$HtC/IeWKSrmKAGJL0VbYug$xis4pWogjhBhOz3A4xqHeH3DyTNHQ5pzHn4fTtbsrXk', 2),
    ('lg', 'lg@stockemoise.be', '$argon2id$v=19$m=65536,t=3,p=4$HtC/IeWKSrmKAGJL0VbYug$xis4pWogjhBhOz3A4xqHeH3DyTNHQ5pzHn4fTtbsrXk', 1),
    ('bg', 'bg@stockemoise.be', '$argon2id$v=19$m=65536,t=3,p=4$HtC/IeWKSrmKAGJL0VbYug$xis4pWogjhBhOz3A4xqHeH3DyTNHQ5pzHn4fTtbsrXk', 1),
    ('me', 'me@stockemoise.be', '$argon2id$v=19$m=65536,t=3,p=4$HtC/IeWKSrmKAGJL0VbYug$xis4pWogjhBhOz3A4xqHeH3DyTNHQ5pzHn4fTtbsrXk', 2);