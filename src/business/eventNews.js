import { createNews } from "../models/news.js"
import { createEvent } from "../models/events.js"


export const addNewsAndAddEvent = async(SQLClient, eventNews, session) => {
    try {
        const newNews = await createNews(SQLClient, eventNews, session)
        await createEvent(SQLClient, newNews.id, eventNews.location, eventNews.event.datetimeEvent)

        return newNews
    }
    catch(err) {
        throw err
    }
}