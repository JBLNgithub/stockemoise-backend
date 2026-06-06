import {Router} from 'express'
import login from '../controllers/auth/login.js'
import refresh from '../controllers/auth/refresh.js'
import logout from '../controllers/auth/logout.js'
import basicIdentify from '../middlewares/auth/basic.identify.js'
import cookieIdentify from '../middlewares/auth/cookie.identify.js'


const router = Router()


router.post('/login', basicIdentify, login)
router.post('/refresh', cookieIdentify, refresh)
router.post('/logout', logout)
// router.post('/change-password', mustBeLoggedIn, updatePassword)


export default router