import {pool} from '../databases/SQLite3.js'
import { nextEvents as nextEventsModel } from '../models/events.js'


export const nextEvents = async(req, res) => {
    try {
        const events = await nextEventsModel(pool)
        res.status(200).send(events)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}