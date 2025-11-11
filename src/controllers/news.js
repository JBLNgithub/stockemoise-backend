import {pool} from '../databases/SQLite3.js'
import { 
    allNews,
    getSingleNews as getSingleNewsModel,
    getSingleEventNews,
    nextEventNews as nexEventNewsModel,
    createNews
 } from '../models/news.js'
import { addNewsAndAddEvent } from '../business/eventNews.js'
import { addLocation, addLocationAndLocality } from '../business/location.js'
import {deleteNewsAndEventNewsIfExists, patchNewsAndEventNews} from '../business/news.js'


export const getAllNews = async(req, res) => {
    try {
        const news = await allNews(pool, req.val.limit)
        res.status(200).send(news)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const getSingleNews = async(req, res) => {
    const {id} = req.val
    try {
        const news = await getSingleNewsModel(pool, id)

        if(news) {
            const eventNews = await getSingleEventNews(pool, id)
            news.event = eventNews ? eventNews : null;
    
            res.status(200).send(news)
        }
        else {
            res.sendStatus(404)
        }
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const nextEventNews = async(req, res) => {
    try {
        const eventNews = await nexEventNewsModel(pool, req.val.limit)
        res.status(200).send(eventNews)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const addNews = async(req, res) => {
    try {
        const newNews = await createNews(pool, req.val)
        newNews.success = true
        res.status(201).send({success: true, id:newNews.id})
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const addNewsAndEvent = async(req, res) => {
    // TODO : use transactions
    try {
        const newEventNews = await addNewsAndAddEvent(pool, req.val)
        res.status(201).send({success: true, id:newEventNews.id})
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const addNewsAndEventAndLocation = async(req, res) => {
    // TODO : use transactions
    try {
        const location = await addLocation(pool, req.val.location)

        req.val.location = location

        const newEventNews = await addNewsAndAddEvent(pool, req.val)
        res.status(201).send({success: true, id:newEventNews.id})
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const addNewsAndEventAndLocationAndLocality = async(req, res) => {
    // TODO : use transactions
    try {
        const location = await addLocationAndLocality(pool, req.val.location)

        req.val.location = location

        const newEventNews = await addNewsAndAddEvent(pool, req.val)
        res.status(201).send({success: true, id:newEventNews.id})
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const patchNews = async(req, res) => {
    try {
        patchNewsAndEventNews(pool, req.val)
        res.status(200).send({success: true})
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }

}

export const setNewCover = async(req, res) => {
    try {
        console.log("val :", req.val)
        console.log("file :", req.file)
        console.log('filename :', req.file.filename)
        // TODO : set filename in db
        res.sendStatus(200)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const removeNews = async(req, res) => {    
    try {
        await deleteNewsAndEventNewsIfExists(pool, req.val.id)
        res.sendStatus(200)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

