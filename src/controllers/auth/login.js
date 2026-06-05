import jwt from 'jsonwebtoken'
import pool from '../../databases/database.js'
import { readUserByEmail } from '../../models/users.js'
import {verify} from 'argon2'
import AUTH_CONFIG from '../../config/auth.js'


export default function login(req, res) {
    const refreshToken = jwt.sign(req.session, process.env.PRIVATE_KEY, {expiresIn: '1m'})
    const accessToken = jwt.sign(req.session, process.env.PRIVATE_KEY, {expiresIn: '1m'})

    res.cookie(AUTH_CONFIG.cookieName, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',      // secure ==> https
        sameSite: process.env.NODE_ENV === 'PROD' ? 'Strict' : 'Lax',
        maxAge: AUTH_CONFIG.refreshTokenDuration
    })

    res.status(200).send(accessToken)
}


export const verifyCredentials = async(email, password) => {
	let user
	try {
    	user = await readUserByEmail(pool, email)
	}
	catch(err) {
		console.error(err)
		throw err
	}

    if(!user || !await verify(user.password, password)) {
        return null
    }
    else {
        delete user.password
        delete user.email
        return user
    }
}


export function generateAccessToken (payload) {

}