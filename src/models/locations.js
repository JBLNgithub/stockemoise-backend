export const createLocation = async(SQLClient, {name, street, number, additionalAddress, locality}) => {
    const query = "INSERT INTO location(name, street, number, additionalAddress, locality) VALUES ($1, $2, $3, $4, $5) RETURNING id"

    const rows = await SQLClient.query(query, [name, street, number, additionalAddress, locality])
    return rows[0]
}

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

export const doesLocationNameExist = async(SQLClient, name) => {
    const query = "SELECT COUNT(*) FROM location WHERE name = $1"

    const rows = await SQLClient.query(query, [name])
    return rows[0]['COUNT(*)']
}