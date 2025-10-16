import vine from '@vinejs/vine'


const schema = vine.object({
    limit: vine.number().min(1).withoutDecimals()
})

const validator = vine.compile(schema)


/**
 * @swagger
 * components:
 *  responses:
 *      validateLimit:
 *          description: limit parameter not valid
 */
const validateLimit = async(req, res, next) => {
    const limit = req.query.limit

    if(!limit) {
        req.val = {limit:null}
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