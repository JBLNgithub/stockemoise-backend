import pool from '../../databases/database.js'
import { doesCountryExist } from '../../models/country.js'


export const countryMustExists = async(req, res, next) => {
    if(await doesCountryExist(pool, req.val.location.locality.country)) {
        next()
    }
    else {
        res.status(403).send({success: false, message: 'Ce pays n\'existe pas !'})
    }
}