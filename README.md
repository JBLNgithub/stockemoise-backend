# stockemoise-backend
backend of the stockemoise website, more information on my [portfolio](http://portfolio.jbln.be)

version : 0.6.1

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

- "DEV"
- "PROD"

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