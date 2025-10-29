import {Router} from 'express'
import {getLocalities} from '../controllers/localities.js'


const router = Router()


router.get('/', getLocalities)


export default router