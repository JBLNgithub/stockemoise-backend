import {Router} from 'express'
import login from '../controllers/auth/login.js'
import {basicAuth, mustBeLoggedIn} from '../middlewares/identify.js'


const router = Router()


router.post('/login', basicAuth, login)
// router.post('/logout', mustBeLoggedIn, logout)
// router.post('/change-password', mustBeLoggedIn, updatePassword)
// router.post('/isLoggedIn', mustBeLoggedIn, isLoggedIn)    // TEMP before access/refresh token


export default router