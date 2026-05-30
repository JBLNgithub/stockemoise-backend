import vine from '@vinejs/vine'


const schema = vine.object({
    title: vine.string(),
    content: vine.string(),
    cover: vine.string().nullable(),
})

const validator = vine.compile(schema)


const validateNews = async(req, res, next) => {
    const newNews = req.body

    if(newNews) {
        try {
            const val = await validator.validate(newNews)

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


export default validateNews