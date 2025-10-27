import {pool} from '../databases/SQLite3.js'
import { 
    allNews,
    getSingleNews as getSingleNewsModel,
    getSingleEventNews,
    nextEventNews as nexEventNewsModel,
    createNews
 } from '../models/news.js'


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

        if(!news) throw new Error("news does not exist")

        const eventNews = await getSingleEventNews(pool, id)

        news.event = eventNews ? eventNews : null;

        res.status(200).send(news)
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
        res.status(201).send(newNews)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const addNewsAndEvent = async(req, res) => {
    console.log("TODO add news and event")
    console.log('val :', req.val)
    res.sendStatus(200)
}

export const addNewsAndEventAndLocation = async(req, res) => {
    console.log("TODO add news and event and location")
    console.log('val :', req.val)
    res.sendStatus(200)
}

export const addNewsAndEventAndLocationAndLocality = async(req, res) => {
    console.log("TODO add news and event and location and locality")
    console.log('val :', req.val)
    res.sendStatus(200)
}

export const updateNews = (req, res) => {
    console.log("TODO next")
    res.send("TODO")
}

export const deleteNews = (req, res) => {
    console.log("TODO next")
    res.send("TODO")
}

