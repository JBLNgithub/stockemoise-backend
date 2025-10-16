import {Router} from 'express'
import {
    getOperators,
    addOperator,
    updateOperatorPWD,
    deleteOperator
} from '../controllers/operators.js'


const router = Router()


router.get('/', getOperators)
router.post('/:id', addOperator)
router.patch('/:id', updateOperatorPWD)
router.delete('/:id', deleteOperator)


export default router