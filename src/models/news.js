export const allNews = async(SQLClient) => {
    const query = "SELECT id, title, dateRedaction, cover FROM news ORDER BY dateRedaction DESC"

    const rows = await SQLClient.query(query)
    return rows
}