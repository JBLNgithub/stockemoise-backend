import {readFileSync} from 'node:fs'
import {pool} from '../../databases/SQLite3.js'

const fileNames = [
    'initDB.sql',
    'initDatas.sql',
    'initUsers.sql',
    'initNews.sql'
]

fileNames.map(async(file) => {
    const requests = readFileSync(`./src/scripts/SQL/${file}`, {encoding: 'utf-8'})

    try {
        await pool.queries(requests)
        console.log(`init ${file} succed`)
    }
    catch(error) {
        console.error(`init ${file} failed`, error)
    }
})