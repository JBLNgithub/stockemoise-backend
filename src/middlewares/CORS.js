import cors from 'cors'
import { Router } from 'express'


const router = Router()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

router.use(cors(corsOptions))


export default router