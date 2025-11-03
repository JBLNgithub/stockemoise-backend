import {Router} from 'express'
import APIRouter from './API.js'
import docs from './api-docs.js'
import express from 'express'
import path from 'path'


const router = Router()

// backend
router.use('/api', APIRouter)
router.use('/api-docs', docs)

// frontend
const __dirname= path.resolve()
router.use(express.static(path.join(__dirname, "/dist")))
router.get('*all', (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"))
})


export default router