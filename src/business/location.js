import {createLocation} from '../models/locations.js'
import { createLocality } from '../models/locality.js'


export const addLocation = async(SQLClient, location) => {
    try {
        const res = await createLocation(SQLClient, location)
        return res.id
    }
    catch(err) {
        throw err
    }
}

export const addLocationAndLocality = async(SQLClient, location) => {
    try {
        await createLocality(SQLClient, location.locality)
        
        location.locality = location.locality.codePostal
            
        const res = await addLocation(SQLClient, location)

        return res
    }
    catch(err) {
        throw err
    }
}