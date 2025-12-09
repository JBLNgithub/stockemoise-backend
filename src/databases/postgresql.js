import 'dotenv/config'
import pg from 'pg'


const pgPool = new pg.Pool({
    user: process.env.DATABASE_POSTGRESQL_USER,
    host: process.env.DATABASE_POSTGRESQL_HOST,
    // database: process.env.DATABASE_POSTGRESQL_DATABASE,
    password: process.env.DATABASE_POSTGRESQL_PASSWORD,
    port: process.env.DATABASE_POSTGRESQL_PORT
})


/* ----- Second part ----- */
const pool = {
    query: async(query, params) => {
        try {
            return await pgPool.query(query, params)
        }
        catch(err) {
            console.error(err)
            throw err
        }
    },
    queries: async(query, params) => {
        try {
            return await pgPool.query(query, params)
        }
        catch(err) {
            console.error(err)
            throw err
        }
    },
    end: () => {
        return pgPool.end()
    },
    USERS_COLUMN_NAME: 'member'
}


/* ----- Third part ----- */
process.on("exit", () => {
    pgPool.end().then(() => console.log("pool closed"))
})


export default pool