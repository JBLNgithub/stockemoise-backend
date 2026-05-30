import vine from '@vinejs/vine'


const schema = vine.object({
    locality: vine.number().min(1).withoutDecimals()      // doc states that .positive() throw on 0, but it's a lie >:(
})

const validator = vine.compile(schema)


const validateConcert = async(req, res, next) => {
    const {locality} = req.body.location

    
    if(locality) {
        try {
            const val = await validator.validate({locality})

            req.val.location.locality = val.locality
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