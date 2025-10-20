import {Router} from 'express'
import { 
    getAllNews, 
    getSingleNews, 
    nextEventNews,
    addNews,
    updateNews,
    deleteNews
} from '../controllers/news.js'
import validateLimit from '../middlewares/validateLimit.js'
import validateId from '../middlewares/validateId.js'


const router = Router()


router.get('/', validateLimit, getAllNews)
router.get('/next', validateLimit, nextEventNews)
router.get('/:id', validateId, getSingleNews)
router.post('/', addNews)
router.patch('/:id', validateId, updateNews)
router.delete('/:id', validateId, deleteNews)


export default router