import {updateNews, deleteNews} from '../models/news.js'
import {updateEvent, deleteEvent} from '../models/events.js'


export const deleteNewsAndEventNewsIfExists = async(SQLClient, id) => {
    try {
        await deleteEvent(SQLClient, id)
        await deleteNews(SQLClient, id)
    }
    catch(err) {
        throw err
    }
}

export const patchNewsAndEventNews = async(SQLClient, val) => {
    if(val.event || val.location) {
        try {
            updateEvent(SQLClient, val)
        }
        catch(err) {
            throw err
        }
    }

    if(val.title || val.content) {
        try {
            updateNews(SQLClient, val)
        }
        catch(err) {
            throw(err)
        }
    }
}