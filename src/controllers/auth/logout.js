import AUTH_CONFIG from "../../config/auth.js"


export default function logout(req, res) {
	if(req.cookies[AUTH_CONFIG.cookieName]) res.clearCookie(AUTH_CONFIG.cookieName)
	res.sendStatus(204)
}