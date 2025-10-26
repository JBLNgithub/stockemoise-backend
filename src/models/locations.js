export const readLocations = async(SQLClient) => {
    const query = "SELECT id, name FROM location ORDER BY name ASC"

    const rows = await SQLClient.query(query)
    return rows
}

export const doesLocationExist = async(SQLClient, id) => {
    const query = "SELECT COUNT(*) FROM location WHERE id = $1"

    const rows = await SQLClient.query(query, [id])
    return rows[0]['COUNT(*)']
}