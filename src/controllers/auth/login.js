import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import pool from '../../databases/database.js'
import { readUserByEmail, readUserById } from '../../models/users.js'
import {verify} from 'argon2'
import AUTH_CONFIG from '../../config/auth.js'
import payloadConstructor from '../../utils/payloadConstructor.js'


export default function login(req, res) {
	generateAndSetRefreshToken(req.session, res)
    const accessToken = generateAccessToken(req.session)

    res.status(200).json({accessToken})
}


export const verifyCredentials = async({id, email}, password) => {
	let user
	try {
		if(email) user = await readUserByEmail(pool, email)
		else if(id) user = await readUserById(pool, id)
		else throw new Error('Neither id or email provided')
	}
	catch(err) {
		throw err
	}

	if(!user) return null

	if(await verify(user.password, pepperPassword(password))) {
		return payloadConstructor(user)
	}
	else {
		return null
	}
}

export function pepperPassword(password) {
	const PEPPER = process.env.PASSWORD_KEY
	if(!PEPPER) throw new Error('PASSWORD_KEY not defined')

	return crypto
		.createHmac('sha256', PEPPER)
		.update(password)
		.digest('hex')
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
        maxAge: AUTH_CONFIG.refreshTokenDuration * 1000
    })
}
