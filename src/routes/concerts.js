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
import validateLimit from '../middlewares/dataValidation/validateLimit.js'
import validateId from '../middlewares/dataValidation/validateId.js'
import validateConcert from '../middlewares/dataValidation/validateConcert.js'
import validateLocation from '../middlewares/dataValidation/validateLocation.js'
import validateNewLocation from '../middlewares/dataValidation/validateNewLocation.js'
import validateLocality from '../middlewares/dataValidation/validateLocality.js'
import validateNewLocality from '../middlewares/dataValidation/validateNewLocality.js'
import { locationMustExists, locationNameMustNotExists } from '../middlewares/dataValidation/locationExists.js'
import { localityMustExists, localityMustNotExists } from '../middlewares/dataValidation/localityExists.js'
import { countryMustExists } from '../middlewares/dataValidation/countryExists.js'
import validateUpdatedConcert from '../middlewares/dataValidation/validateUpdatedConcert.js'
import validateUpdatedLocation from '../middlewares/dataValidation/validateUpdatedLocation.js'
import accessIdentify from '../middlewares/auth/accessToken.identify.js'
import requiredAuth from '../middlewares/auth/required.authorize.js'
import LEVELS from '../utils/LEVELS.js'


const router = Router()

router.get('/next', validateLimit, nextConcerts)
router.get('/:id', validateId, getConcert)
router.post('/', accessIdentify, requiredAuth(LEVELS.operator), validateConcert, validateLocation, locationMustExists, addConcert)
router.post('/with-location', accessIdentify, requiredAuth(LEVELS.operator), validateConcert, validateNewLocation, locationNameMustNotExists, validateLocality, localityMustExists, addConcertAndLocation)
router.post('/with-location&locality', accessIdentify, requiredAuth(LEVELS.operator), validateConcert, validateNewLocation, locationNameMustNotExists, validateNewLocality, localityMustNotExists, countryMustExists, addConcertAndLocationAndLocality)
router.patch('/:id', accessIdentify, requiredAuth(LEVELS.operator), validateId, validateUpdatedConcert, validateUpdatedLocation, setConcert)
router.delete('/:id', accessIdentify, requiredAuth(LEVELS.operator), validateId, removeConcert)


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

router.post('/cover/:id', accessIdentify, requiredAuth(LEVELS.operator), validateId, multerConfigs.single('cover'), setNewCover)


export default router