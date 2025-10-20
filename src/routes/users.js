import {Router} from 'express'
import { login, logout, updatePassword } from '../controllers/users.js'
import {BasicAuth} from '../middlewares/identify.js'


const router = Router()


router.get('/login', BasicAuth, login)
router.get('/logout', logout)
router.get('change-password', updatePassword)


export default router