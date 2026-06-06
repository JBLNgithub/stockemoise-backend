import { generateAccessToken, generateAndSetRefreshToken } from "./login.js"


export default function refresh(req, res) {
	generateAndSetRefreshToken(req.session, res)
	const accessToken = generateAccessToken(req.session)
	res.status(200).json({accessToken})
}