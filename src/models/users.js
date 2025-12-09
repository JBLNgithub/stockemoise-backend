export const readUserByEmail = async(SQLClient, email) => {
    const query = `SELECT * FROM ${SQLClient.USERS_COLUMN_NAME} WHERE email = $1`

    const rows = await SQLClient.query(query, [email])
    return rows[0]
}