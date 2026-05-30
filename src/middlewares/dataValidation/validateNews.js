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
            res.status(412).send({success: false, message: err.messages[0].message})
        }

    }
    else {
        res.status(400).send({success: false, message: 'Aucune news fourni'})
    }
}


export default validateNews