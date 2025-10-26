export const doesLocalityExist = async(SQLClient, codePostal) => {
    const query = "SELECT COUNT(*) FROM locality WHERE codePostal = $1"

    const rows = await SQLClient.query(query, [codePostal])
    return rows[0]['COUNT(*)']
}