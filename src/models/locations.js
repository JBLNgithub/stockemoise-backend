export const readLocations = async(SQLClient) => {
    const query = "SELECT id, name FROM location ORDER BY name ASC"

    const rows = await SQLClient.query(query)
    return rows
}