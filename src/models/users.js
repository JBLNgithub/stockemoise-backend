import sqlAdapter from "../utils/sqlAdapter.js"


export const readUserByEmail = async(SQLClient, email) => {
    const query = `SELECT * FROM ${sqlAdapter.USER()} WHERE email = $1`

    const rows = await SQLClient.query(query, [email])
    return rows[0]
}