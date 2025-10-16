import {Router} from 'express'
import { nextEvents } from '../controllers/planning.js'


const router = Router()


router.get('/',nextEvents)


export default router