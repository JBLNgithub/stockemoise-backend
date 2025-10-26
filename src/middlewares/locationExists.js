import { pool } from '../databases/SQLite3.js'
import { doesLocationExist } from '../models/locations.js'


export const locationMustExists = async(req, res, next) => {
    if(await doesLocationExist(pool, req.val.location)) {
        next()
    }
    else {
        console.error('ERROR : location does not exist')
        res.sendStatus(403)
    }
}
