/* import { nextConcerts } from "../../models/concerts.js"
import {pool} from '../../databases/SQLite3.js'

// console.log(await nextConcerts(pool))

import spec from '../../datas/spec.json' with {type: 'json'}


console.log(spec) */


import vine from '@vinejs/vine'

const schema = vine.object({
  limit: vine.number().min(1).withoutDecimals()
})

const data = {
  limit: 2
}

const output = await vine.validate({
  schema,
  data
})

console.log(output)
