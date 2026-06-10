import express from 'express'
import 'dotenv/config'

import router from './routes/index.js'
import exitHandler from './utils/exitHandler.js'
import logger from './middlewares/logger.js'
import CORS from './middlewares/CORS.js'
import cookieParser from 'cookie-parser'


const app = express()
const host = process.env.HOST || "http://localhost:"
const port = process.env.PORT || 3000
const node_env = process.env.NODE_ENV || 'PROD'

// CORS
if(node_env === 'DEV') app.use(CORS)

// parser middleware
app.use(express.json())
app.use(cookieParser())

// logger
if(node_env === 'DEV') app.use(logger)

// routes
app.use(router)

// exit processus
exitHandler()

// launch server
app.listen(port, () => {
	console.log(`server env : ${node_env}`)
    const processURL = `${host}${ host === "http://localhost:" ? "" : "\t"}${port}`
    console.log(`server start : ${processURL}`)
    // console.log(`API docs : ${processURL}/api-docs`)
});