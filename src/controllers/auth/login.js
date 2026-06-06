import jwt from 'jsonwebtoken'
import pool from '../../databases/database.js'
import { readUserByEmail } from '../../models/users.js'
import {verify} from 'argon2'
import AUTH_CONFIG from '../../config/auth.js'
import payloadConstructor from '../../utils/payloadConstructor.js'


export default function login(req, res) {
	generateAndSetRefreshToken(req.session, res)
    const accessToken = generateAccessToken(req.session)

    res.status(200).json({accessToken})
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

	// TODO : swap secret key from PRIVATE_KEY to PASSWORD_KEY, WAIT I DONT USE ANY SCRET KEY ??
    if(!user || !await verify(user.password, password)) {
        return null
    }
    else {
     	return payloadConstructor(user)
    }
}


export function generateAccessToken (user) {
	return jwt.sign(payloadConstructor(user), process.env.ACCESS_TOKEN_KEY, {expiresIn: AUTH_CONFIG.accessTokenDuration})
}


export function generateAndSetRefreshToken (user, res) {
	const refreshToken = jwt.sign(payloadConstructor(user), process.env.REFRESH_TOKEN_KEY, {expiresIn: AUTH_CONFIG.refreshTokenDuration})

	res.cookie(AUTH_CONFIG.cookieName, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',      // secure ==> https
        sameSite: process.env.NODE_ENV === 'PROD' ? 'Strict' : 'Lax',
        maxAge: AUTH_CONFIG.refreshTokenDuration
    })
}
