import {pool} from '../databases/SQLite3.js'
import {readCountries} from '../models/country.js'


export const getCountries = async(req, res) => {
    try {
        const countries = await readCountries(pool)
        res.status(200).send(countries)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}