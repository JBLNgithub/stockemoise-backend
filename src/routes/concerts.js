import {Router} from 'express'
import {nextConcerts} from '../controllers/concerts.js'


const router = Router()

/**
 * @swagger
 * /nextConcerts:
 *  get:
 *      responses:
 *          200:
 *              description : list of concerts
 *          500:
 *              description : Error server
 */
router.get('/nextConcerts', nextConcerts)


export default router