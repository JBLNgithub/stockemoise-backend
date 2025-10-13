import express from 'express'
import exitHandler from './utils/exitHandler.js'


const app = express()
const port = 3000

// body parser middleware
app.use(express.json())

// exit processus
exitHandler()

// launch server
app.listen(port, () => {
    console.log(`server start :\nhttp://localhost:${port}`);
});