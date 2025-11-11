import {Router, static as expressStatic} from 'express'


const router = Router()


router.use('/', expressStatic('./uploads'))


export default router