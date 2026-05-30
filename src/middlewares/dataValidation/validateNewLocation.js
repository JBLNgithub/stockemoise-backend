import vine from '@vinejs/vine'


const schema = vine.object({
        name: vine.string(),
        street: vine.string(),
        number: vine.number().min(1),
        additionalAddress: vine.string().nullable(),
})

const validator = vine.compile(schema)


const validateNewLocation = async(req, res, next) => {
    const {location} = req.body


    if(location) {
        try {
            const val = await validator.validate(location)

            req.val.location = val
            next()
        }
        catch(err) {
            console.log(err.messages)
            res.status(412).send({success: false})
        }

    }
    else {
        res.status(400).send({success: false, message: 'aucun nouveau lieu fourni'})
    }
}


export default validateNewLocation