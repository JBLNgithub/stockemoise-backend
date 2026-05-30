import vine from '@vinejs/vine'


const schema = vine.object({
    id: vine.number().min(0).withoutDecimals()
})

const validator = vine.compile(schema)


const validateId = async(req, res, next) => {
    const {id} = req.params

    try {
        const val = await validator.validate({id})
        req.val = val
        next()
    }
    catch(err) {
        res.status(412).send({message: err.messages[0].message})
    }

}


export default validateId