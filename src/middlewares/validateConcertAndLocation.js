import vine from '@vinejs/vine'


const schema = vine.object({
    title: vine.string(),
    content: vine.string(),
    cover: vine.string().nullable(),
    datetimeEvent: vine.string(),                                           // TODO : validate date (after 'now')
    location: vine.object({
        name: vine.string(),
        street: vine.string(),
        number: vine.number().withoutDecimals().min(1),
        additionnalAddress: vine.string().nullable(),
        locality: vine.number().withoutDecimals().min(1)
    })
})

const validator = vine.compile(schema)


const validateConcertAndLocation = async(req, res, next) => {
    const concert = req.body

    if(concert) {
        try {
            const val = await validator.validate(concert)

            req.val = val
            next()
        }
        catch(err) {
            console.log(err.messages)
            res.status(412).send({success: false})
        }

    }
    else {
        res.status(400).send({success: false})
    }
}


export default validateConcertAndLocation