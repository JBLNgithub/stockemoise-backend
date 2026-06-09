import {Router} from 'express'
import login from '../controllers/auth/login.js'
import refresh from '../controllers/auth/refresh.js'
import logout from '../controllers/auth/logout.js'
import changePWD from '../controllers/auth/changePWD.js'
import authPairIdentify from '../middlewares/auth/authPair.identify.js'
import accessIdentify from '../middlewares/auth/accessToken.identify.js'
import refreshIdentify from '../middlewares/auth/refreshToken.identify.js'
import pwdValidation from '../middlewares/auth/passwords.validation.js'


const router = Router()


router.post('/login', authPairIdentify, login)
router.get('/refresh', refreshIdentify, refresh)
router.post('/logout', logout)
router.post('/change-password', accessIdentify, pwdValidation, changePWD)


export default router