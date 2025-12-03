import pool from '../databases/database.js'
import { 
    nextConcerts as nextConcertsModel,
    createConcert,
    readConcert,
    updateConcert,
    deleteConcert
} from '../models/concerts.js'
import {addLocation, addLocationAndLocality} from '../business/location.js'
import isEmptyObject from '../utils/isEmptyObject.js'


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
        if(concert) {
            res.status(200).send(concert)
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

export const addConcert = async(req, res) => {
    try {
        const concert = await createConcert(pool, req.val, req.session)
        res.status(201).send({success: true, id: concert.id})
    }
    catch(err) {
        console.error(err)
        res.status(500).send({success: false})
    }
}

export const addConcertAndLocation = async(req, res) => {
    // TODO : use transactions
    try {
        const location = await addLocation(pool, req.val.location)

        req.val.location = location

        const concert = await createConcert(pool, req.val, req.session)
        res.status(201).send({success: true, id: concert.id})
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export const addConcertAndLocationAndLocality = async(req, res) => {
    // TODO : use transactions
    try {
        const location = await addLocationAndLocality(pool, req.val.location)

        req.val.location = location

        const concert = await createConcert(pool, req.val, req.session)
        res.status(201).send({success: true, id: concert.id})
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }

}

export const setConcert = async(req, res) => {
    if(Object.entries(req.val).length > 1) {
        await updateConcert(pool, req.val)
        res.status(200).send({success: true})
    }
    else {
        console.log('no valid field given')
        res.sendStatus(404)
    }
}

export const setNewCover = async(req, res) => {
    try {
        await updateConcert(pool, {id: req.val.id, cover: req.file.filename})
        res.status(200).send({success: true})
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
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