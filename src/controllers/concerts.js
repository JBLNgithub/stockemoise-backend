import {pool} from '../databases/SQLite3.js'
import { nextConcerts as nextConcertsModel } from '../models/concerts.js'

/**
 * @swagger
 * components:
 *  responses:
 *      nextConcerts:
 *          description : list of concerts
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref : '#components/schemas/concerts'
 */
export const nextConcerts = async(req, res) => {
    try {
        const concerts = await nextConcertsModel(pool, req.val.limit)
        res.status(200).send(concerts)
    }
    catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export const getConcert = (req, res) => {
    console.log("TODO")
    res.send("TODO")
}

export const addConcert = (req, res) => {
    console.log("TODO")
    res.send("TODO")
}

export const updateConcert = (req, res) => {
    console.log("TODO")
    res.send("TODO")
}

export const deleteConcert = (req, res) => {
    console.log("TODO")
    res.send("TODO")
}