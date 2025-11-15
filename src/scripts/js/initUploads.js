import {copyFileSync, readdirSync, rmSync, mkdirSync} from 'node:fs'


const srcDir = './default_uploads'
const destDir = './uploads'

rmSync(destDir, {recursive: true, force: true})
mkdirSync(destDir)

const defaultUploads = readdirSync(srcDir)
defaultUploads.map((file) => {copyFileSync(`${srcDir}/${file}`, `${destDir}/${file}`)})


console.log('initUploads succed')