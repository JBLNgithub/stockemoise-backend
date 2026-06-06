export default function requiredAuthorization(level) {
	return (req, res, next) => {
		req.session?.level <= level ? next() : res.sendStatus(403)
	}
}