import sqlite3 from 'sqlite3'
import 'dotenv/config'

/* const dbPath = 'database.db'
const db = new sqlite3.Database(dbPath) */

const db = new sqlite3.Database(process.env.DATABASE)

async function dbQuery(database, query, params) {
    return new Promise((resolve, reject) => {
            database.all(query, params, (err, rows) => {
                if(err){
                    reject(err)
                    throw err
                }
                return resolve(rows)
            })

    })
}

async function dbQueries(database, queries) {
    return new Promise((resolve, reject) => {
            database.exec(queries, (err) => {
                if(err){
                    reject(err)
                    throw err
                }
                return resolve("queries done")
            })

    })
}

export const pool = {
    query: async(query, params) => {
        try {
            return await dbQuery(db, query, params)
        }
        catch(error) {
            throw(error)
        }
    },
    queries: async(queries) => {
        try {
            return await dbQueries(db, queries)
        }
        catch(error) {
            throw(error)
        }
    },
    end: () => {
        db.close()
    }
}


process.on("beforeExit", () => {
    db.close((err) => {
        if(err) {
            console.log("pool already closed ?? idk, some process shit going on there")
        }
        else {
            console.log("pool closed")
        }
    })
})