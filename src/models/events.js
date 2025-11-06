export const nextEvents = async(SQLClient) => {
    const query = "SELECT n.id, n.title, n.cover, en.dateEvent, 'eventNews' AS type FROM news n INNER JOIN eventNews en on (n.id = en.id AND en.dateEvent > datetime('now')) UNION SELECT c.id, c.title, c.cover, c.dateEvent, 'concert' AS type FROM concert c WHERE c.dateEvent > datetime('now') ORDER BY dateEvent ASC"

    const rows = await SQLClient.query(query)
    return rows
}

export const createEvent = async(SQLClient, id, location, dateEvent) => {
    const query = "INSERT INTO eventNews(id, location, dateEvent) VALUES ($1, $2, $3)"

    await SQLClient.query(query, [id, location, dateEvent])
}

export const updateEvent = async(SQLClient, {id, event, location}) => {
    let query = "UPDATE eventNews set "
    const querySet = []
    const queryValues = []

    if(event) {
        queryValues.push(event.datetimeEvent)
        querySet.push(`dateEvent = $${queryValues.length}`)
    }
    if(location) {
        queryValues.push(location)
        querySet.push(`location = $${queryValues.length}`)
    }

    if(queryValues.length > 0) {
        queryValues.push(id)
        query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`
        await SQLClient.query(query, queryValues)
    }
    else {
        throw new Error("No valid field given")
    }
}

export const deleteEvent = async(SQLClient, id) => {
    const query = "DELETE FROM eventNews WHERE id = $1"

    await SQLClient.query(query, [id])
}