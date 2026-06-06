import AUTH_CONFIG from "../config/auth.js"


export default function payloadConstructor (user) {
	const payload = {}
	AUTH_CONFIG.payloadItems.map(item => payload[item] = user[item])
	return payload
}