import { pool } from '../databases/SQLite3.js'
import { doesLocalityExist } from '../models/locality.js'


export const localityMustExists = async(req, res, next) => {
    if(await doesLocalityExist(pool, req.val.location.locality)) {
        next()
    }
    else {
        console.error('ERROR : locality does not exist')
        res.status(403).send({success: false})
    }
}

export const localityMustNotExists = async(req, res, next) => {
    if(!await doesLocalityExist(pool, req.val.location.locality.codePostal)) {
        next()
    }
    else {
        console.error('ERROR : locality already exists')
        res.status(403).send({success: false})
    }
}
