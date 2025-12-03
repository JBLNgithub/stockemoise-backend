import pool from '../databases/database.js'
import { readLocations } from '../models/locations.js'
import { createLocation } from '../models/locations.js'
import {createLocality} from '../models/locality.js'

// @ Deprecated
export const addLocation = async(SQLClient, location) => {
    try {
        const res = await createLocation(SQLClient, location)
        return res.id
    }
    catch(err) {
        throw err
    }
}

// @ Deprecated
export const addLocationAndLocality = async(SQLClient, location) => {
    try {
        await createLocality(SQLClient, location.locality)
        
        location.locality = location.locality.codePostal
        console.log(location)
            
        const res = await addLocation(SQLClient, location)

        return res
    }
    catch(err) {
        throw err
    }
}


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