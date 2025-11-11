import {Router} from 'express'
import multer from 'multer'
import {
    nextConcerts, 
    addConcert,
    addConcertAndLocation,
    addConcertAndLocationAndLocality,
    getConcert, 
    setConcert,
    setNewCover,
    removeConcert
} from '../controllers/concerts.js'
import validateLimit from '../middlewares/validateLimit.js'
import validateId from '../middlewares/validateId.js'
import validateConcert from '../middlewares/validateConcert.js'
import validateLocation from '../middlewares/validateLocation.js'
import validateNewLocation from '../middlewares/validateNewLocation.js'
import validateLocality from '../middlewares/validateLocality.js'
import validateNewLocality from '../middlewares/validateNewLocality.js'
import { mustBeLoggedIn } from '../middlewares/identify.js'
import { mustBeOperator } from '../middlewares/permissions.js'
import { locationMustExists, locationNameMustNotExists } from '../middlewares/locationExists.js'
import { localityMustExists, localityMustNotExists } from '../middlewares/localityExists.js'
import validateUpdatedConcert from '../middlewares/validateUpdatedConcert.js'
import validateUpdatedLocation from '../middlewares/validateUpdatedLocation.js'


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
router.post('/', mustBeLoggedIn, mustBeOperator, validateConcert, validateLocation, locationMustExists, addConcert)
router.post('/with-location', mustBeLoggedIn, mustBeOperator, validateConcert, validateNewLocation, locationNameMustNotExists, validateLocality, localityMustExists, addConcertAndLocation)
router.post('/with-location&locality', mustBeLoggedIn, mustBeOperator, validateConcert, validateNewLocation, locationNameMustNotExists, validateNewLocality, localityMustNotExists, addConcertAndLocationAndLocality)
router.patch('/:id', mustBeLoggedIn, mustBeOperator, validateId, validateUpdatedConcert, validateUpdatedLocation, setConcert)
router.delete('/:id', mustBeLoggedIn, mustBeOperator, validateId, removeConcert)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const multerConfigs = multer({storage})

router.post('/cover/:id', mustBeLoggedIn, mustBeOperator, validateId, multerConfigs.single('cover'), setNewCover)


export default router