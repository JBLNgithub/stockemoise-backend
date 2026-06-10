import vine from '@vinejs/vine'


const schema = vine.object({
        codePostal: vine.number().min(1),
        city: vine.string(),
        country: vine.number()
})

const validator = vine.compile(schema)


const validateConcert = async(req, res, next) => {
    const {locality} = req.body.location

    if(locality) {
        try {
            const val = await validator.validate(locality)

            req.val.location.locality = val
            next()
        }
        catch(err) {
            res.status(412).send({success: false, message: err.messages[0].message})
        }

    }
    else {
        res.status(400).send({success: false, message: 'aucune nouvelle localité fourni'})
    }
}


export default validateConcert