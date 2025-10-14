/**
 * @swagger
 * components:
 *  schemas:
 *      concerts:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              title:
 *                  type: string
 *              content:
 *                  type: string
 *              dateRedaction:
 *                  type: string
 *              cover:
 *                  type: string
 *              dateEvent:
 *                  type: string
 *              isCanceled:
 *                  type: boolean
 */
export const nextConcerts = async(SQLClient, limit) => {
    let query = "SELECT * FROM concert WHERE dateEvent > datetime('now') ORDER BY dateEvent ASC"
    const queryValues = []

    if(limit) {
        query += ' LIMIT $1'
        queryValues.push(limit)
    }

    const rows = await SQLClient.query(query, queryValues)
    return rows
}