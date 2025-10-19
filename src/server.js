import express from 'express'
import 'dotenv/config'

import router from './routes/index.js'
import exitHandler from './utils/exitHandler.js'
import logger from './middlewares/logger.js'
import CORS from './middlewares/CORS.js'


const app = express()
const host = process.env.HOST || "http://localhost:"
const port = process.env.PORT || 3000
const node_env = process.env.NODE_ENV

// CORS
if(node_env === 'DEVELOMENT') app.use(CORS)

// body parser middleware
app.use(express.json())

// logger
if(node_env === 'DEVELOPMENT') app.use(logger)

// routes
app.use(router)

// exit processus
exitHandler()

// launch server
app.listen(port, () => {
    console.log(`server start : ${host}${port}`);
    console.log(`API docs : ${host}${port}/api-docs`)
});