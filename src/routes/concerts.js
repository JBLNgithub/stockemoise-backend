import {Router} from 'express'
import {nextConcerts} from '../controllers/concerts.js'


const router = Router()

router.get('/nextConcerts', nextConcerts)


export default router