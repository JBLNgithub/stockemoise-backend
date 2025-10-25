import {Router} from 'express'
import {
    nextConcerts, 
    getConcert, 
    addConcert,
    updateConcert,
    deleteConcert
} from '../controllers/concerts.js'
import validateLimit from '../middlewares/validateLimit.js'
import validateId from '../middlewares/validateId.js'
import validateConcert from '../middlewares/validateConcert.js'
import { mustBeLoggedIn } from '../middlewares/identify.js'
import { mustBeOperator } from '../middlewares/permissions.js'


const router = Router()

/**
 * @swagger
 * /concerts/next:
 *  get:
 *      summary: return next concerts
 *      parameters:
 *      -   in: query
 *          name: limit
 *          description: maximum number of concerts to return
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref : '#components/responses/nextConcerts'
 *          412:
 *              $ref : '#components/responses/validateLimit'
 *          500:
 *              description : error server
 *          
 */
router.get('/next', validateLimit, nextConcerts)
router.get('/:id', validateId, getConcert)
router.post('/', mustBeLoggedIn, mustBeOperator, validateConcert, addConcert)
router.patch('/:id', validateId, updateConcert)
router.delete('/:id', validateId, deleteConcert)


export default router