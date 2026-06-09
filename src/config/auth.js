const AUTH_CONFIG = {
	// duration : days * hours * minutes * seconds * miliseconds
	refreshTokenDuration: 1 * 24 * 60 * 60 * 1000,
	accessTokenDuration: 1 * 60 * 1000,

	cookieName: 'stockAuth',
	payloadItems: ['id', 'username', 'level']
}


export default AUTH_CONFIG