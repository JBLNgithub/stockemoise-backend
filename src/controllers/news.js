import {pool} from '../databases/SQLite3.js'
import { allNews } from '../models/news.js'


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

export const getSingleNews = (req, res) => {
    console.log("TODO get")
    res.send("TODO")
}

export const nextEventNews = (req, res) => {
    console.log("TODO next")
    res.send("TODO")
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

