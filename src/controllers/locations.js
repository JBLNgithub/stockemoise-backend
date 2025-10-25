import {pool} from '../databases/SQLite3.js'
import { readLocations } from '../models/locations.js'


export const getLocations = async(req, res) => {
    try {
        const locations = await readLocations(pool)
        res.status(200).send(locations)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}