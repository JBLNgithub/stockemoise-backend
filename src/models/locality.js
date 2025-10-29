export const createLocality = async(SQLClient, {codePostal, city, country}) => {
    const query = "INSERT INTO locality(codePostal, city, country) VALUES ($1, $2, $3)"

    const rows = await SQLClient.query(query, [codePostal, city, country])
    return rows[0]
}

export const readLocalities = async(SQLClient) => {
    const query = "SELECT * FROM locality ORDER BY codePostal ASC"
    
    const rows = await SQLClient.query(query)
    return rows
}

export const doesLocalityExist = async(SQLClient, codePostal) => {
    const query = "SELECT COUNT(*) FROM locality WHERE codePostal = $1"

    const rows = await SQLClient.query(query, [codePostal])
    return rows[0]['COUNT(*)']
}
