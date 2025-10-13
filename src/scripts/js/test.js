import { nextConcerts } from "../../models/concerts.js"
import {pool} from '../../databases/SQLite3.js'

console.log(await nextConcerts(pool))