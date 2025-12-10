import {readFileSync} from 'node:fs'
import pool from '../../databases/database.js'
import 'dotenv/config'


const fileNames = [
    'initDB.sql',
    'initUsers.sql',
    'initDatas.sql',
    'initNews.sql'
]

const DB = process.env.DATABASE
let sqlTypeDirectory

switch(DB) {
    case 'SQLITE':
        sqlTypeDirectory = ''
        break
    case 'POSTGRESQL':
        sqlTypeDirectory = 'postgresql/'
        break
    default:
        console.error('DATABASE NOT DEFINED IN ENV FROM initDB')
}


const exec = async() => {
    let requests

    for (let i=0; i < fileNames.length; i++) {
        try {
            requests = readFileSync(`./src/scripts/SQL/${sqlTypeDirectory}${fileNames[i]}`, {encoding: 'utf-8'})
            await pool.queries(requests)
            console.log(`init ${fileNames[i]} succed`)
        }
        catch(error) {
            console.error(`init ${fileNames[i]} failed`, error)
        }
    }
}

exec()

/* fileNames.map(async(file) => {
    const requests = readFileSync(`./src/scripts/SQL/${sqlTypeDirectory}${file}`, {encoding: 'utf-8'})

    try {
        await pool.queries(requests)
        console.log(`init ${file} succed`)
    }
    catch(error) {
        console.error(`init ${file} failed`, error)
    }
}) */