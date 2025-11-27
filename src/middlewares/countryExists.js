import { pool } from '../databases/SQLite3.js'
import { doesCountryExist } from '../models/country.js'


export const countryMustExists = async(req, res, next) => {
    if(await doesCountryExist(pool, req.val.location.locality.country)) {
        next()
    }
    else {
        console.error('ERROR : country does not exist')
        res.status(403).send({success: false, message: 'country does not exist'})
    }
}