import pool from '../databases/database.js'
import { readUserByEmail } from '../models/users.js'
import {hash, verify} from 'argon2'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import cookies from '../utils/cookies.js'


export const login = (req, res) => {
    const token = jwt.sign(req.session, process.env.PRIVATE_KEY)
    
    res.cookie(cookies.auth.name, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PRODUCTION',      // secure ==> https
        sameSite: process.env.NODE_ENV === 'PRODUCTION' ? 'Strict' : 'Lax',
        maxAge: 3 * 24 * 60 * 60 * 1000                     // expiration in ms : days * hours * minutes * seconds * miliseconds
    })

    res.status(200).json({success: true})
}

export const loginGetUser = async(email, password) => {
    const user = await readUserByEmail(pool, email)

    if(!user) {
        return null
    }
    else if(!await verify(user.password, password)) {
        return null
    } 
    else {
        delete user.password
        return user
    }
}

export const logout = (req, res) => {
    res.clearCookie(cookies.auth.name)
    res.status(200).json({success:true})
}

// TEMP before access/refresh token
export const isLoggedIn = (req, res, next) => {
    res.status(200).json({success: true})
}

export const updatePassword = (req, res) => {
    console.log("TODO : updatePassowrd")
    res.send("TODO")
}