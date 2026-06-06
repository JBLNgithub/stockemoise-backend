import jwt from 'jsonwebtoken'
import payloadConstructor from "../../utils/payloadConstructor.js"


export default function bearerToken(req, res, next) {
    const auth = req.get('Authorization')

    if(auth && auth.substring(0,6) === 'Bearer') {
        const authFields = auth.split(' ')
        try {
            const payload = jwt.verify(authFields[1], process.env.ACCESS_TOKEN_KEY)
            req.session = payloadConstructor(payload)
            next()
        }
        catch(err) {
        	console.log(err)
            res.sendStatus(401)
        }
    }
    else {
        res.sendStatus(400)
    }
}