import swaggerJSDoc from 'swagger-jsdoc'
import {writeFileSync} from 'node:fs'


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "La Stockemoie API",
            version: "0.1.0"
        }
    },
    apis: [
        "./src/controllers/**/*.js",
        "./src/middlewares/**/*.js",
        "./src/models/**/*.js",
        "./src/routes/**/*.js",
    ]
}


const swaggerSpec = swaggerJSDoc(options)
writeFileSync("./src/datas/spec.json", JSON.stringify(swaggerSpec))