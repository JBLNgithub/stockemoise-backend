# stockemoise-backend
backend of the stockemoise website project, more information on my [portfolio](https://jblngithub.github.io/portfolio/)

version : 0.4

## Environments variables

### required

```
DATABASE=<type>
PRIVATE_KEY=<key>
```

### optional

```
HOST=<path>
PORT=<port>
NODE_ENV=<ENVIRONMENT>
DATABASE_SQLITE=<path>
```

#### NODE_ENV

- "DEVELOPMENT"
- "PRODUCTION"

#### DATABASE

- 'SQLITE'
- 'POSTGRESQL'

#### required if DATABASE='POSTGRESQL'

```
DATABASE_POSTGRESQL_HOST=<path>
DATABASE_POSTGRESQL_PORT=<port>
DATABASE_POSTGRESQL_PASSWORD=<password>
DATABASE_POSTGRESQL_USER=<user>
```