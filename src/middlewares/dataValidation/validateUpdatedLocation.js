import vine from '@vinejs/vine'
import pool from '../../databases/database.js'
import { doesLocationExist } from '../../models/locations.js'


const schema = vine.object({
    location: vine.number().min(1).withoutDecimals().optional()      // doc states that .positive() throw on 0, but it's a lie >:(
})

const validator = vine.compile(schema)


const validateUpdatedLocation = async(req, res, next) => {
    const {location} = req.body

    if(location) {
        try {
            const val = await validator.validate({location})

            if(await doesLocationExist(pool, val.location)) {
                req.val.location = val.location
                next()
            }
            else {
                res.status(403).send({success: false, message: 'Ce lieu n\'existe pas !'})
            }
        }
        catch(err) {
            console.error(err.messages)
            res.status(412).send({success: false, message: 'Aucun lieu fourni'})
        }

    }
    else {
        next()
    }
}


export default validateUpdatedLocation