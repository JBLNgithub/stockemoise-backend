import {Router} from 'express'
import multer from 'multer'
import { 
    getAllNews, 
    getSingleNews, 
    nextEventNews,
    addNews,
    addNewsAndEvent,
    addNewsAndEventAndLocation,
    addNewsAndEventAndLocationAndLocality,
    patchNews,
    setNewCover,
    removeNews
} from '../controllers/news.js'
import validateNews from '../middlewares/validateNews.js'
import validateLimit from '../middlewares/validateLimit.js'
import validateId from '../middlewares/validateId.js'
import validateEventNews from '../middlewares/validateEventNews.js'
import validateLocation from '../middlewares/validateLocation.js'
import validateNewLocation from '../middlewares/validateNewLocation.js'
import validateLocality from '../middlewares/validateLocality.js'
import validateNewLocality from '../middlewares/validateNewLocality.js'
import { locationMustExists, locationNameMustNotExists } from '../middlewares/locationExists.js'
import { localityMustExists, localityMustNotExists } from '../middlewares/localityExists.js'
import { countryMustExists } from '../middlewares/countryExists.js'
import { mustBeLoggedIn } from '../middlewares/identify.js'
import { mustBeOperator } from '../middlewares/permissions.js'
import validateUpdatedNews from '../middlewares/validateUpdatedNews.js'
import validateUpdatedLocation from '../middlewares/validateUpdatedLocation.js'


const router = Router()


router.get('/', validateLimit, getAllNews)
router.get('/next', validateLimit, nextEventNews)
router.get('/:id', validateId, getSingleNews)
router.post('/', mustBeLoggedIn, mustBeOperator, validateNews, addNews)
router.post('/with-event', mustBeLoggedIn, mustBeOperator, validateNews, validateEventNews, validateLocation, locationMustExists, addNewsAndEvent)
router.post('/with-event&location', mustBeLoggedIn, mustBeOperator, validateNews, validateEventNews, validateNewLocation, locationNameMustNotExists, validateLocality, localityMustExists, addNewsAndEventAndLocation)
router.post('/with-event&location&locality', mustBeLoggedIn, mustBeOperator, validateNews, validateEventNews, validateNewLocation, locationNameMustNotExists, validateNewLocality, localityMustNotExists, countryMustExists, addNewsAndEventAndLocationAndLocality)
router.patch('/:id', mustBeLoggedIn, mustBeOperator, validateId, validateUpdatedNews, validateUpdatedLocation, patchNews)
router.delete('/:id', validateId, removeNews)

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