export const nextEvents = async(SQLClient) => {
    const query = "SELECT n.id, n.title, n.cover, en.dateEvent, 'eventNews' AS type FROM news n INNER JOIN eventNews en on (n.id = en.id AND en.dateEvent > datetime('now')) UNION SELECT c.id, c.title, c.cover, c.dateEvent, 'concert' AS type FROM concert c WHERE c.dateEvent > datetime('now') ORDER BY dateEvent ASC"

    const rows = await SQLClient.query(query)
    return rows
}

export const createEvent = async(SQLClient, id, location, dateEvent) => {
    const query = "INSERT INTO eventNews(id, location, dateEvent) VALUES ($1, $2, $3)"

    await SQLClient.query(query, [id, location, dateEvent])
}

export const deleteEvent = async(SQLClient, id) => {
    const query = "DELETE FROM eventNews WHERE id = $1"

    await SQLClient.query(query, [id])
}