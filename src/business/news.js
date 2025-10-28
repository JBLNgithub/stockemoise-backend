import {deleteNews} from '../models/news.js'
import {deleteEvent} from '../models/events.js'


export const deleteNewsAndEventNewsIfExists = async(SQLClient, id) => {
    try {
        await deleteEvent(SQLClient, id)
        await deleteNews(SQLClient, id)
    }
    catch(err) {
        throw err
    }
}