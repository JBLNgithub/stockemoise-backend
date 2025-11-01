import vine from '@vinejs/vine'


const schema = vine.object({
    cover: vine.string().nullable().optional(),
    title: vine.string().optional(),
    content: vine.string().optional(),
    datetimeEvent: vine.string().optional(),            // TODO : validate date (after 'now')
})

const validator = vine.compile(schema)


const validateUpdatedConcert = async(req, res, next) => {
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


export default validateUpdatedConcert