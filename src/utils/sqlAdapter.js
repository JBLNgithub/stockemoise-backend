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
    }
}


export default sqlAdapter