import 'dotenv/config'


const DB = process.env.DATABASE

const sqlAdapter = {
    NOW: () => {
        switch(DB) {
            case "SQLITE": 
                return "datetime('now')"
                break
            case "POSTGRESQL":
                return 'now()'
                break
            default:
                console.error("DATABASE ENV NOT DEFINED")
        }
    },
    COUNT: () => {
        switch(DB) {
            case "SQLITE": 
                return 'COUNT(*)'
                break
            case "POSTGRESQL":
                return 'count'
                break
            default:
                console.error("DATABASE ENV NOT DEFINED")
        }
    },
    USER: () => {
        switch(DB) {
            case "SQLITE": 
                return 'user'
                break
            case "POSTGRESQL":
                return 'member'
                break
            default:
                console.error("DATABASE ENV NOT DEFINED")
        }
    }
}


export default sqlAdapter