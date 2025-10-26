import {Router} from 'express'
import { 
    getAllNews, 
    getSingleNews, 
    nextEventNews,
    addNews,
    updateNews,
    deleteNews
} from '../controllers/news.js'
import validateNews from '../middlewares/validateNews.js'
import validateLimit from '../middlewares/validateLimit.js'
import validateId from '../middlewares/validateId.js'
import { mustBeLoggedIn } from '../middlewares/identify.js'
import { mustBeOperator } from '../middlewares/permissions.js'


const router = Router()


router.get('/', validateLimit, getAllNews)
router.get('/next', validateLimit, nextEventNews)
router.get('/:id', validateId, getSingleNews)
router.post('/', mustBeLoggedIn, mustBeOperator, validateNews, addNews)
// router.post('/with-event', addNews)
// router.post('/with-event&location', addNews)
// router.post('/with-event&location&locality', addNews)
router.patch('/:id', validateId, updateNews)
router.delete('/:id', validateId, deleteNews)


export default router