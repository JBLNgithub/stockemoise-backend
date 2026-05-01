import {format} from 'date-fns'
import path from 'path'
import fs from 'fs'


const logger = (req, res, next) => {
    // to file log
    // console.log(`${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}\t${req.method}\t${req.headers.origin}\t${req.url}`)
    
    // to console log
    console.log(`${req.method}\t${req.headers.origin}\t${req.url}`)
    next()
}

const errLog = async(message) => {
    const logItem = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}\t${message}`

    try {
        if(!fs.existsSync(path.join(__dirname), '..', 'logs')) {
            await fs.promises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fs.promises.appendFile(path.join(__dirname, '..', 'logs', 'errLog.txt'), logItem)
    }
    catch(err) {
        console.error(err)
    }

}


export default logger