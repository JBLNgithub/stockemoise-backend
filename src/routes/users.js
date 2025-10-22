import {Router} from 'express'
import { login, logout, updatePassword, isLoggedIn } from '../controllers/users.js'
import {basicAuth, mustBeLoggedIn} from '../middlewares/identify.js'


const router = Router()


router.get('/login', basicAuth, login)
router.get('/logout', mustBeLoggedIn, logout)
router.get('change-password', updatePassword)
router.get('/isLoggedIn', mustBeLoggedIn, isLoggedIn)    // TEMP before access/refresh token


export default router