import {pool} from '../databases/SQLite3.js'
import { nextConcerts as nextConcertsModel } from '../models/concerts.js'


export const nextConcerts = async(req, res) => {
    try {
        const concerts = await nextConcertsModel(pool, req.query.limit)
        res.status(200).send(concerts)
    }
    catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}