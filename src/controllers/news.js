import {pool} from '../databases/SQLite3.js'
import { 
    allNews,
    getSingleNews as getSingleNewsModel,
    getSingleEventNews,
    nextEventNews as nexEventNewsModel
 } from '../models/news.js'


export const getAllNews = async(req, res) => {
    try {
        const news = await allNews(pool)
        res.status(200).send(news)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const getSingleNews = async(req, res) => {
    const {id} = req.params
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
        const eventNews = await nexEventNewsModel(pool, req.query.limit)
        res.status(200).send(eventNews)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const addNews = (req, res) => {
    console.log("TODO next")
    res.send("TODO")
}

export const updateNews = (req, res) => {
    console.log("TODO next")
    res.send("TODO")
}

export const deleteNews = (req, res) => {
    console.log("TODO next")
    res.send("TODO")
}

