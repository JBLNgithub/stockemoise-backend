import 'dotenv/config'
import jwt from 'jsonwebtoken'
import {loginGetUser} from '../controllers/users.js'


export const basicAuth = async(req, res, next) => {
    const auth = req.get("Authorization")

    if(auth && auth.substring(0, 5) === 'Basic') {
        const authFields = auth.split(' ')
        const authDecoded = Buffer.from(authFields[1], 'base64').toString('utf-8')
        const email = authDecoded.slice(0, authDecoded.indexOf(":"))
        const password = authDecoded.slice(authDecoded.indexOf(":") + 1)

        const user =  await loginGetUser(email, password)

        if(!user) {
            res.sendStatus(404)
        }
        else {
            req.session = user
            next()
        }
    }
    else {
        res.sendStatus(500)
    }
}


export const bearerToken = (req, res, next) => {
    const auth = req.get('Authorization')
    
    if(auth && auth.substring(0,6) === 'Bearer') {
        const authFields = auth.split(' ')
        try {
            const payload = jwt.verify(authFields[1], process.env.PRIVATE_KEY)
            req.session(payload)
            next()
        }
        catch(err) {
            res.sendStatus(511)
        }
    }
    else {
        res.sendStatus(500)
    }
}