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
        console.log(err.messages)
        res.sendStatus(412)
    }
    
}


export default validateId