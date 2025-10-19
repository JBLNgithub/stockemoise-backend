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
    const query = 'SELECT en.dateEvent, en.isCanceled, l.name AS locationName, l.street AS locationStreet, l.number AS locationNumber, l.additionalAddress AS locationAdditionalAddress, ly.codePostal AS locationCodePostal, ly.city AS locationCity, ly.country AS locationCountry FROM eventNews en INNER JOIN location l ON en.location = l.id INNER JOIN locality ly ON l.locality = ly.codePostal WHERE en.id = $1'

    const rows = await SQLClient.query(query, [id])
    return rows[0]
}

export const nextEventNews = async(SQLClient, limit) => {
    let query = "SELECT en.id, n.title, en.dateEvent, en.isCanceled, l.name AS locationName FROM eventNews en INNER JOIN news n ON en.id = n.id INNER JOIN location l ON en.location = l.id WHERE en.dateEvent > datetime('now') ORDER BY en.dateEvent ASC"
    const queryValues = []

    if(limit) {
        query += ' LIMIT $1'
        queryValues.push(limit)
    }

    const rows = await SQLClient.query(query, queryValues)
    return rows
}