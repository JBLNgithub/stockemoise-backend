import express from 'express'
import 'dotenv/config'

import exitHandler from './utils/exitHandler.js'


const app = express()
const host = process.env.HOST || "http://localhost:"
const port = process.env.PORT || 3000

// body parser middleware
app.use(express.json())

// exit processus
exitHandler()

// launch server
app.listen(port, () => {
    console.log(`server start :\n${host}${port}`);
});