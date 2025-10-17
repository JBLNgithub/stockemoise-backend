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