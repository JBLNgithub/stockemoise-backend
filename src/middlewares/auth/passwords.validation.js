import vine from '@vinejs/vine'


const schema = vine.object({
    password: vine.string(),
    newPassword: vine.string().confirmed({}).notSameAs('password')
})

vine.convertEmptyStringsToNull = true
const validator = vine.compile(schema)


export default async function changePWDValidation(req, res, next) {
	const {body} = req
	console.log('body', body)

	if(!body) {
		res.sendStatus(400)
	}
	else {
		try {
			const val = await validator.validate(body)

			req.val = val
			next()
		}
		catch(err) {
			res.status(422).send({message: err.messages[0].message})
		}
	}
}