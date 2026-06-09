import {hash} from 'argon2'
import pool from '../../databases/database.js'
import { verifyCredentials } from './login.js'
import { updatePassword } from '../../models/users.js'
import logout from './logout.js'


export default async function changePWD(req, res) {
	const {id} = req.session
	const {password, newPassword} = req.val

	try {
		const user = await verifyCredentials({id}, password)

		if(!user){
			res.status(401).send({message: 'Le mot de passe actuel ne correspond pas.'})
		}
		else {
			await updatePassword(pool, id, (await hash(newPassword)))
			logout(req, res)
		}
	}
	catch(err) {
		console.error(err)
		res.sendStatus(500)
	}

}
