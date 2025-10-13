import {Router} from 'express'
import APIRouter from './API.js'
import docs from './api-docs.js'


const router = Router()

router.use('/api', APIRouter)
router.use('/api-docs', docs)

export default router