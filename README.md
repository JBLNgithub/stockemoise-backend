# stockemoise-backend
backend of the stockemoise website, more information on my [portfolio](http://portfolio.jbln.be)

version : 0.6.2

## Environments variables

### required

```
REFRESH_TOKEN_KEY=<key>
ACCESS_TOKEN_KEY=<key>
PASSWORD_KEY=<key>
```

### optional

```
DATABASE=<type>
HOST=<path>
PORT=<port>
NODE_ENV=<ENVIRONMENT>
DATABASE_SQLITE=<path>
```

#### NODE_ENV

- "PROD" (default)
- "DEV"

#### DATABASE

- 'POSTGRESQL' (default)
- 'SQLITE'

#### required if DATABASE='POSTGRESQL'

```
DATABASE_POSTGRESQL_HOST=<path>
DATABASE_POSTGRESQL_PORT=<port>
DATABASE_POSTGRESQL_PASSWORD=<password>
DATABASE_POSTGRESQL_USER=<user>
```

#### required if DATABASE='SQLITE'

```
DATABASE_SQLITE='<name>.db'
```