import vine from '@vinejs/vine'


const schema = vine.object({
    title: vine.string(),
    content: vine.string(),
    cover: vine.string().nullable(),
    datetimeEvent: vine.string(),                                           // TODO : validate date (after 'now')
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
            res.status(412).send({success: false, message: err.messages[0].message})
        }

    }
    else {
        res.status(400).send({success: false})
    }
}


export default validateConcert