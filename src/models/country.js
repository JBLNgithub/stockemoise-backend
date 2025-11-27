export const readCountries = async(SQLClient) => {
    const query = "SELECT * FROM country"

    const rows = await SQLClient.query(query)
    return rows
}

export const doesCountryExist = async(SQLClient, country) => {
    const query = "SELECT COUNT(*) FROM country WHERE id = $1"

    const rows = await SQLClient.query(query, [country])
    return rows[0]['COUNT(*)']
}