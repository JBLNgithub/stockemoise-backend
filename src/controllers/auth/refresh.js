import { generateAccessToken } from "./login.js"


export default function refresh(req, res) {
	const accessToken = generateAccessToken(req.session)
	res.status(200).send(accessToken)
}