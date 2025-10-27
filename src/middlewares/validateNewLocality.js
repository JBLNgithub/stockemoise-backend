import vine from '@vinejs/vine'


const schema = vine.object({
        codePostal: vine.number().min(1),
        city: vine.string(),
        country: vine.string()
})

const validator = vine.compile(schema)


const validateConcert = async(req, res, next) => {
    const {locality} = req.body.location

    console.log('locality :', locality)
    
    if(locality) {
        try {
            const val = await validator.validate(locality)
            
            req.val.location.locality = val
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


export default validateConcert