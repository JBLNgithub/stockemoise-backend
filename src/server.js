import express from 'express'
import 'dotenv/config'

import router from './routes/index.js'
import exitHandler from './utils/exitHandler.js'


const app = express()
const host = process.env.HOST || "http://localhost:"
const port = process.env.PORT || 3000

// body parser middleware
app.use(express.json())

// routes
app.use(router)

// exit processus
exitHandler()

// launch server
app.listen(port, () => {
    console.log(`server start : ${host}${port}`);
    console.log(`API docs : ${host}${port}/api-docs`)
});