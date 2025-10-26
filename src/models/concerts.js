/**
 * @swagger
 * components:
 *  schemas:
 *      nextConcerts:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              title:
 *                  type: string
 *              dateEvent:
 *                  type: string
 *              isCanceled:
 *                  type: boolean
 *              locationName:
 *                  type: string
 */
export const nextConcerts = async(SQLClient, limit) => {
    let query = "SELECT c.id, c.title, c.dateEvent, c.isCanceled, l.name AS locationName FROM concert c INNER JOIN location l ON (c.location = l.id) WHERE c.dateEvent > datetime('now') ORDER BY dateEvent ASC"
    const queryValues = []

    if(limit) {
        query += ' LIMIT $1'
        queryValues.push(limit)
    }

    const rows = await SQLClient.query(query, queryValues)
    return rows
}

export const createConcert = async(SQLClient, {title, content, cover, dateEvent, location}) => {
    const query = "INSERT INTO concert(title, content, cover, dateEvent, location) VALUES ($1, $2, $3, $4, $5) RETURNING id"

    const rows = await SQLClient.query(query, [title, content, cover, dateEvent, location])
    return rows[0]
}

export const readConcert = async(SQLClient, id) => {
    const query = "SELECT c.title, c.content, c.dateRedaction, c.cover, c.dateEvent, c.isCanceled, l.name AS locationName, l.street AS locationStreet, l.number AS locationNumber, l.additionalAddress AS locationAdditionalAddress, ly.codePostal AS locationCodePostal, ly.city AS locationCity, ly.country AS locationCountry FROM concert c INNER JOIN location l ON c.location = l.id INNER JOIN locality ly ON l.locality = ly.codePostal WHERE c.id = $1"

    const rows = await SQLClient.query(query, [id])
    return rows[0]
}

export const deleteConcert = async(SQLClient, id) => {
    const query = "DELETE FROM concert WHERE id = $1"

    await SQLClient.query(query, [id])
}