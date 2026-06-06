import jwt from 'jsonwebtoken'
import pool from '../../databases/database.js'
import { readUserByEmail } from '../../models/users.js'
import {verify} from 'argon2'
import AUTH_CONFIG from '../../config/auth.js'
import payloadConstructor from '../../utils/payloadConstructor.js'


export default function login(req, res) {
    const refreshToken = generateRefreshToken(req.session)
    const accessToken = generateAccessToken(req.session)

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
     	return payloadConstructor(user)
    }
}


export function generateAccessToken (user) {
	return jwt.sign(payloadConstructor(user), process.env.PRIVATE_KEY, {expiresIn: '1m'})
}


export function generateRefreshToken (user) {
	return jwt.sign(payloadConstructor(user), process.env.PRIVATE_KEY, {expiresIn: '1m'})
}