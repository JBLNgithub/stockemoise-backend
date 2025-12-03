import pool from '../databases/database.js'
import { doesLocationExist, doesLocationNameExist } from '../models/locations.js'


export const locationMustExists = async(req, res, next) => {
    if(await doesLocationExist(pool, req.val.location)) {
        next()
    }
    else {
        console.error('ERROR : location does not exist')
        res.status(403).send({success: false})
    }
}

export const locationNameMustNotExists = async(req, res, next) => {
    if(!await doesLocationNameExist(pool, req.val.location.name)) {
        next()
    }
    else {
        console.error('ERROR : location name already exists')
        res.status(403).send({success: false})
    }
}