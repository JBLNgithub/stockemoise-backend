import 'dotenv/config'
import { pool as SQLITE_POOL } from "./SQLite3.js";
import POSTGRESQL_POOL from './postgresql.js'


const DB = process.env.DATABASE

let pool

switch(DB) {
    case "SQLITE": 
        pool = SQLITE_POOL
        break
    case "POSTGRESQL":
        pool = POSTGRESQL_POOL
        break
    default:
        console.error("DATABASE ENV NOT DEFINED")
}


export default pool