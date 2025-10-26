import vine from '@vinejs/vine'


const schema = vine.object({
    title: vine.string(),
    content: vine.string(),
    cover: vine.string().nullable(),
    datetimeEvent: vine.string(),                                           // TODO : validate date (after 'now')
    location: vine.number({strict: true}).min(1).withoutDecimals()      // doc states that .positive() throw on 0, but it's a lie >:(
})

const validator = vine.compile(schema)


const validateConcert = async(req, res, next) => {
    const concert = req.body

    if(concert) {
        try {
            const val = await validator.validate(concert)

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