export const nextConcerts = async(SQLClient, limit) => {
    let query = "SELECT * FROM concert WHERE dateEvent > datetime('now') ORDER BY dateEvent ASC"
    const queryValues = []

    if(limit) {
        query += ' LIMIT $1'
        queryValues.push(limit)
    }

    const rows = await SQLClient.query(query, queryValues)
    return rows
}