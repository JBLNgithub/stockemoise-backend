import {pool} from '../databases/SQLite3.js'
import { readUserByEmail } from '../models/users.js'
import {hash, verify} from 'argon2'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


export const login = (req, res) => {
    console.log("Token :", jwt.sign(req.session, process.env.PRIVATE_KEY))
    // TODO send jsonwebtoken back
    res.send("TODO")
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
    console.log("TODO")
    res.send("TODO")
}

export const updatePassword = (req, res) => {
    console.log("TODO")
    res.send("TODO")
}