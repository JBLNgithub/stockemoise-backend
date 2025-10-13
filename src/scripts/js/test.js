import 'dotenv/config'

const production = process.env.NODE_ENV

console.log(production, typeof(production))

console.log(production === 'PRODUCTION' ? 'true' : 'false')