import {Router} from 'express'
import concertsRouter from './concerts.js'


const router = Router()

router.use('/concerts', concertsRouter)


export default router