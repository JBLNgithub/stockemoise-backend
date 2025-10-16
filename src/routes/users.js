import {Router} from 'express'
import { login, logout, updatePassword } from '../controllers/users.js'


const router = Router()


router.get('/login', login)
router.get('/logout', logout)
router.get('change-password', updatePassword)


export default router