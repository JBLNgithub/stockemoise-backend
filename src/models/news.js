export const allNews = async(SQLClient) => {
    const query = "SELECT id, title, dateRedaction, cover FROM news ORDER BY dateRedaction DESC"

    const rows = await SQLClient.query(query)
    return rows
}

export const getSingleNews = async(SQLClient, id) => {
    const query = 'SELECT * FROM news WHERE id = $1'

    const rows = await SQLClient.query(query, [id])
    return rows[0]
}

export const getSingleEventNews = async(SQLClient, id) => {
    const query = 'SELECT * FROM eventNews WHERE id = $1'

    const rows = await SQLClient.query(query, [id])
    return rows[0]
}

export const nextEventNews = async(SQLClient, limit) => {
    let query = "SELECT * FROM eventNews en INNER JOIN news n ON en.id = n.id WHERE en.dateEvent > datetime('now') ORDER BY en.dateEvent ASC"
    const queryValues = []

    if(limit) {
        query += ' LIMIT $1'
        queryValues.push(limit)
    }

    const rows = await SQLClient.query(query, queryValues)
    return rows
}