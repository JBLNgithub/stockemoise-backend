import {Router} from 'express'
import concertsRouter from './concerts.js'
import newsRouter from './news.js'
import usersRouter from './users.js'
import planningRouter from './planning.js'
import operatorsRouter from './operators.js'


const router = Router()

router.use('/concerts', concertsRouter)
router.use('/news', newsRouter)
router.use('/users', usersRouter)
router.use('/planning', planningRouter)
router.use('/operators', operatorsRouter)


export default router