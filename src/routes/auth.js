import {Router} from 'express'
import login from '../controllers/auth/login.js'
import refresh from '../controllers/auth/refresh.js'
import logout from '../controllers/auth/logout.js'
import authPairIdentify from '../middlewares/auth/authPair.identify.js'
import refreshIdentify from '../middlewares/auth/refreshToken.identify.js'


const router = Router()


router.post('/login', authPairIdentify, login)
router.post('/refresh', refreshIdentify, refresh)
router.post('/logout', logout)
// router.post('/change-password', mustBeLoggedIn, updatePassword)


export default router