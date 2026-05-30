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

            req.val = Object.assign(val, req.val)
            next()
        }
        catch(err) {
            res.status(412).send({success: false, message: err.messages[0].message})
        }

    }
    else {
        res.status(400).send({success: false, message: 'Aucun concert fourni'})
    }
}


export default validateUpdatedConcert