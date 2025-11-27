import {Router} from 'express'
import {getCountries} from '../controllers/countries.js'


const router = Router()


router.get('/', getCountries)


export default router