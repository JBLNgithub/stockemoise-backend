const AUTH_CONFIG = {
	// duration : days * hours * minutes * seconds
	refreshTokenDuration: 1 * 24 * 60 * 60,
	accessTokenDuration: 15 * 60,

	cookieName: 'stockAuth',
	payloadItems: ['id', 'username', 'level']
}


export default AUTH_CONFIG