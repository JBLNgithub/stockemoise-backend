import {readFileSync} from 'node:fs'
import {pool} from '../../databases/SQLite3.js'


const DBRequests = readFileSync('./src/scripts/SQL/initDB.sql', {encoding: 'utf-8'})

try {
    await pool.queries(DBRequests)
    console.log('init DB succed')
}
catch(error) {
    console.error('error initDB', error)
}

const DatasRequests = readFileSync('./src/scripts/SQL/initDatas.sql', {encoding: 'utf-8'})

try {
    await pool.queries(DatasRequests)
    console.log('init Datas succed')
}
catch(error) {
    console.error('error initDatas', error)
}
