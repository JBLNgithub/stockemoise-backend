import {pool} from '../databases/SQLite3.js'
import { 
    nextConcerts as nextConcertsModel,
    createConcert,
    readConcert,
    deleteConcert
} from '../models/concerts.js'

/**
 * @swagger
 * components:
 *  responses:
 *      nextConcerts:
 *          description : list of concerts
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref : '#components/schemas/nextConcerts'
 */
export const nextConcerts = async(req, res) => {
    try {
        const concerts = await nextConcertsModel(pool, req.val.limit)
        res.status(200).send(concerts)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const getConcert = async(req, res) => {
    try {
        const concert = await readConcert(pool, req.val.id)
        res.status(200).send(concert)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const addConcert = async(req, res) => {
    try {
        const concert = await createConcert(pool, req.val)
        res.status(201).send({success: true, id: concert.id})
    }
    catch(err) {
        console.error(err)
        res.status(500).send({success: false})
    }
}

export const setConcert = async(req, res) => {
    console.log("TODO")
    res.send("TODO")
}

export const removeConcert = async(req, res) => {
    try {
        await deleteConcert(pool, req.val.id)
        res.sendStatus(200)
    }
    catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}