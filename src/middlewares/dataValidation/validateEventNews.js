import vine from '@vinejs/vine'


const schema = vine.object({
    datetimeEvent: vine.string()            // TODO : validate datetime
})

const validator = vine.compile(schema)


const validateEventNews = async(req, res, next) => {
    const event = req.body.event

    if(event) {
        try {
            const val = await validator.validate(event)

            req.val.event = val
            next()
        }
        catch(err) {
            console.log(err.messages)
            res.status(412).send({success: false})
        }

    }
    else {
        console.error("ERROR : no event found")
        res.status(400).send({success: false})
    }
}


export default validateEventNews