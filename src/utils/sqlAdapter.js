import 'dotenv/config'


const DB = process.env.DATABASE || 'POSTGRESQL'

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
    },
    EN_DATE_EVENT: () => {
        switch(DB) {
            case "SQLITE":
                return "en.dateEvent"
            case "POSTGRESQL":
                return "TO_CHAR(en.dateEvent, 'YYYY-MM-DD HH24:MI:SS')"
            default:
                console.error("DATABASE ENV NOT DEFINED")
        }
    },
    C_DATE_EVENT: () => {
        switch(DB) {
            case "SQLITE":
                return "c.dateEvent"
            case "POSTGRESQL":
                return "TO_CHAR(c.dateEvent, 'YYYY-MM-DD HH24:MI:SS')"
            default:
                console.error("DATABASE ENV NOT DEFINED")
        }
    },
}


export default sqlAdapter