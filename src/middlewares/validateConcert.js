import vine from '@vinejs/vine'
import { pool } from '../databases/SQLite3.js'
import { locationExists } from '../models/locations.js'


const schema = vine.object({
    title: vine.string(),
    content: vine.string(),
    cover: vine.string().nullable(),
    dateEvent: vine.date({formats: ['iso8601']}),
    location: vine.number({strict: true}).min(1).withoutDecimals()      // doc states that .positive() throw on 0, but it's a lie >:(
})

const validator = vine.compile(schema)


const validateConcert = async(req, res, next) => {
    const concert = req.body

    if(concert) {
        try {
            const val = await validator.validate(concert)

            if(!await locationExists(pool, val.location)) {
                throw({messages: 'location does not exist'})
            }

            req.val = val
            next()
        }
        catch(err) {
            console.log(err.messages)
            res.sendStatus(412)
        }

    }
    else {
        res.sendStatus(400)
    }
}


export default validateConcert