import {Router} from 'express'
import {nextConcerts} from '../controllers/concerts.js'


const router = Router()

/**
 * @swagger
 * /concerts/next:
 *  get:
 *      responses:
 *          200:
 *              description : list of concerts
 *          500:
 *              description : Error server
 */
router.get('/next', nextConcerts)


export default router