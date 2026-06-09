import sqlAdapter from "../utils/sqlAdapter.js"


export const readUserByEmail = async(SQLClient, email) => {
    const query = `SELECT * FROM ${sqlAdapter.USER()} WHERE email = $1`

    const rows = await SQLClient.query(query, [email])
    return rows[0]
}

export const readUserById = async(SQLClient, id) => {
	const query = `SELECT * FROM ${sqlAdapter.USER()} WHERE id = $1`
	const rows = await SQLClient.query(query, [id])
	return rows[0]
}

export const updatePassword = async(SQLClient, id, password) => {
	const query = `UPDATE ${sqlAdapter.USER()} SET password = $1 WHERE id = $2`
	await SQLClient.query(query, [password, id])
}