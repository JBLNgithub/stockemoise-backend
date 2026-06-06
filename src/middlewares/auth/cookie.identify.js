import jwt from 'jsonwebtoken'
import AUTH_CONFIG from '../../config/auth.js'


export default function (req, res, next) {
    const refreshToken = req.cookies[AUTH_CONFIG.cookieName]

    if(refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.PRIVATE_KEY)
            req.session = payload
            next()
        }
        catch(err) {
            res.clearCookie(AUTH_CONFIG.cookieName)
            res.sendStatus(401)
        }
    }
    else {
        res.sendStatus(401)
    }
}