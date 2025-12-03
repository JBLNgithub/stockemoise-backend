import pool from '../databases/database.js'
import { readLocalities } from '../models/locality.js'


export const getLocalities = async(req, res) => {
    try {
        const localities = await readLocalities(pool)
        res.status(200).send(localities)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}