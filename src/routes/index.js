import {Router} from 'express'
import APIRouter from './API.js'


const router = Router()

router.use('/api', APIRouter)

export default router