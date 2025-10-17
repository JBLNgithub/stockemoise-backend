export const nextEvents = async(SQLClient) => {
    let query = "SELECT n.id, n.title, n.cover, en.dateEvent, 'eventNews' AS type FROM news n INNER JOIN eventNews en on (n.id = en.id AND en.dateEvent > datetime('now')) UNION SELECT c.id, c.title, c.cover, c.dateEvent, 'concert' AS type FROM concert c WHERE c.dateEvent > datetime('now') ORDER BY dateEvent ASC"

    const rows = await SQLClient.query(query)
    return rows
}