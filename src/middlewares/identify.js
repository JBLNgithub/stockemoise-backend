import 'dotenv/config'
import jwt from 'jsonwebtoken'
import {loginGetUser} from '../controllers/users.js'
import cookies from '../utils/cookies.js'


export const basicAuth = async(req, res, next) => {
    const auth = req.get("Authorization")
    console.log(auth)

    if(auth && auth.substring(0, 5) === 'Basic') {
        const authFields = auth.split(' ')
        const authDecoded = Buffer.from(authFields[1], 'base64').toString('utf-8')
        const email = authDecoded.slice(0, authDecoded.indexOf(":"))
        const password = authDecoded.slice(authDecoded.indexOf(":") + 1)

        const user =  await loginGetUser(email, password)

        if(!user) {
            res.status(404).json({success: false, message: "Cette combinaison email/mot de passe n'a aucune correspondance."})
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

export const mustBeLoggedIn = (req, res, next) => {
    const token = req.cookies[cookies.auth.name]
    console.log(token)

    if(token) {
        try {
            const payload = jwt.verify(token, process.env.PRIVATE_KEY)
            console.log(payload)
            req.session = payload
            next()
        }
        catch(err) {
            console.log(err)
            res.status(401)
        }
    }
    else {
        res.status(404).json({success:false, message: 'not token found'})
    }
}


// keep for access/refresh token later on
export const bearerToken = (req, res, next) => {
    const auth = req.get('Authorization')
    
    if(auth && auth.substring(0,6) === 'Bearer') {
        const authFields = auth.split(' ')
        try {
            const payload = jwt.verify(authFields[1], process.env.PRIVATE_KEY)
            req.session = payload
            next()
        }
        catch(err) {
            res.sendStatus(401)
        }
    }
    else {
        res.sendStatus(500)
    }
}