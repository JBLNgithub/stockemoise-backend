import {Router} from 'express'
import swaggerUI from 'swagger-ui-express'
import spec from '../datas/spec.json' with {type: "json"}


const router = Router()

router.use('/',swaggerUI.serve, swaggerUI.setup(spec))


export default router