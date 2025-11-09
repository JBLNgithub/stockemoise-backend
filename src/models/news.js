export const allNews = async(SQLClient, limit) => {
    let query = "SELECT id, title, dateRedaction, cover FROM news ORDER BY dateRedaction DESC"
    const queryValues = []

        if(limit) {
        query += ' LIMIT $1'
        queryValues.push(limit)
    }

    const rows = await SQLClient.query(query, queryValues)
    return rows
}

export const getSingleNews = async(SQLClient, id) => {
    const query = 'SELECT * FROM news WHERE id = $1'

    const rows = await SQLClient.query(query, [id])
    return rows[0]
}

export const getSingleEventNews = async(SQLClient, id) => {
    const query = 'SELECT en.dateEvent, en.isCanceled, en.location AS locationId, l.name AS locationName, l.street AS locationStreet, l.number AS locationNumber, l.additionalAddress AS locationAdditionalAddress, ly.codePostal AS locationCodePostal, ly.city AS locationCity, ly.country AS locationCountry FROM eventNews en INNER JOIN location l ON en.location = l.id INNER JOIN locality ly ON l.locality = ly.codePostal WHERE en.id = $1'

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

export const createNews = async(SQLClient, {title, content, cover}) => {
    const query = "INSERT INTO news(title, content, cover) VALUES ($1, $2, $3) RETURNING id"

    const rows = await SQLClient.query(query, [title, content, cover])
    return rows[0]
}

export const updateNews = async(SQLClient, {id, title, content}) => {
    let query = "UPDATE news set "
    const querySet = []
    const queryValues = []

    if(title) {
        queryValues.push(title)
        querySet.push(`title = $${queryValues.length}`)
    }
    if(content) {
        queryValues.push(content)
        querySet.push(`content = $${queryValues.length}`)
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

export const deleteNews = async(SQLClient, id) => {
    const query = "DELETE FROM news WHERE id = $1"

    await SQLClient.query(query, [id])
}