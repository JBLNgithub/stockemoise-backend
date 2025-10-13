export const nextConcerts = async(SQLClient) => {
    const rows = await SQLClient.query('SELECT * FROM concert')
    return rows
}