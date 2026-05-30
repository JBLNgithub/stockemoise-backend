import vine from '@vinejs/vine'


const schema = vine.object({
    cover: vine.string().nullable().optional(),
    title: vine.string().optional(),
    content: vine.string().optional(),
    event: vine.object({
        datetimeEvent: vine.string()                    // TODO : validate date (after 'now')
    }).optional()
})

const validator = vine.compile(schema)


const validateUpdatedNews = async(req, res, next) => {
    const news = req.body

    if(news) {
        try {
            const val = await validator.validate(news)

            req.val = Object.assign(val, req.val)
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


export default validateUpdatedNews