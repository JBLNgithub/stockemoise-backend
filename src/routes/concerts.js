import {Router} from 'express'
import {nextConcerts} from '../controllers/concerts.js'
import validateLimit from '../middlewares/validateLimit.js'


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
router.get('/next', validateLimit, nextConcerts)


export default router