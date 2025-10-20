import {Router} from 'express'
import { login, logout, updatePassword } from '../controllers/users.js'
import {basicAuth, bearerToken} from '../middlewares/identify.js'


const router = Router()


router.get('/login', basicAuth, login)
router.get('/logout',bearerToken, logout)
router.get('change-password', updatePassword)


export default router