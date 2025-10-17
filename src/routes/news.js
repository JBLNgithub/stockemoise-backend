import {Router} from 'express'
import { 
    getAllNews, 
    getSingleNews, 
    nextEventNews,
    addNews,
    updateNews,
    deleteNews
} from '../controllers/news.js'


const router = Router()


router.get('/', getAllNews)
router.get('/next', nextEventNews)
router.get('/:id', getSingleNews)
router.post('/', addNews)
router.patch('/:id', updateNews)
router.delete('/:id', deleteNews)


export default router