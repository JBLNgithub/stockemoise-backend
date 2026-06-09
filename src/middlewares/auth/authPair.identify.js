import { verifyCredentials } from '../../controllers/auth/login.js'


export default async function BasicIdentify (req, res, next) {
    const auth = req.get("Authorization")

    if(auth && auth.substring(0, 5) === 'Basic') {
        const authFields = auth.split(' ')
        const authDecoded = Buffer.from(authFields[1], 'base64').toString('utf-8')
        const email = authDecoded.slice(0, authDecoded.indexOf(":"))
        const password = authDecoded.slice(authDecoded.indexOf(":") + 1)

        // const user =  await loginGetUser(email, password)
        let user
        try {
        	user = await verifyCredentials({email}, password)
        }
        catch {
        	return res.sendStatus(400)
        }

        if(!user) {
            res.status(404).json({success: false, message: "Cette combinaison email/mot de passe n'a aucune correspondance."})
        }
        else {
            req.session = user
            next()
        }
    }
    else {
        res.sendStatus(400)
    }
}