export const readUserByEmail = async(SQLClient, email) => {
    const query = 'SELECT * FROM user WHERE email = $1'

    const rows = await SQLClient.query(query, [email])
    return rows[0]
}