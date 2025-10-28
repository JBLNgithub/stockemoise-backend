import vine from '@vinejs/vine'


const schema = vine.object({
    location: vine.number({strict: true}).min(1).withoutDecimals()      // doc states that .positive() throw on 0, but it's a lie >:(
})

const validator = vine.compile(schema)


const validateConcert = async(req, res, next) => {
    const {location} = req.body

    if(location) {
        try {
            const val = await validator.validate({location})

            req.val.location = val.location
            next()
        }
        catch(err) {
            console.log(err.messages)
            res.status(412).send({success: false})
        }

    }
    else {
        console.error("ERROR : no location found")
        res.status(400).send({success: false})
    }
}


export default validateConcert