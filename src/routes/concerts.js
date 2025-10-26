import {Router} from 'express'
import {
    nextConcerts, 
    addConcert,
    addConcertAndLocation,
    getConcert, 
    setConcert,
    removeConcert
} from '../controllers/concerts.js'
import validateLimit from '../middlewares/validateLimit.js'
import validateId from '../middlewares/validateId.js'
import validateConcert from '../middlewares/validateConcert.js'
import validateConcertAndLocation from '../middlewares/validateConcertAndLocation.js'
import { mustBeLoggedIn } from '../middlewares/identify.js'
import { mustBeOperator } from '../middlewares/permissions.js'
import { locationMustExists } from '../middlewares/locationExists.js'


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
router.post('/', mustBeLoggedIn, mustBeOperator, validateConcert, locationMustExists, addConcert)
router.post('/with-location', mustBeLoggedIn, mustBeOperator, validateConcertAndLocation, addConcertAndLocation)
// router.post('/with-location&locality', mustBeLoggedIn, mustBeOperator, validateConcert, locationMustExists, addConcert)
router.patch('/:id', validateId, setConcert)
router.delete('/:id', validateId, removeConcert)


export default router