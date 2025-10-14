import vine from '@vinejs/vine'


const schema = vine.object({
    limit: vine.number().min(1).withoutDecimals()
})

const validator = vine.compile(schema)


const validateLimit = async(req, res, next) => {
    const limit = req.query.limit

    if(!limit) {
        req.val = {limit:undefined}
        next()
    }
    else {
        try {
            const val = await validator.validate({limit})
            req.val = val
            next()
        }
        catch(err) {
            console.log(err.messages)
            res.sendStatus(412)
        }
    }
}


export default validateLimit